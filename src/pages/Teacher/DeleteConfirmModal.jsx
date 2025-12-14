// pages/Teacher/components/DeleteConfirmModal.jsx
import { Modal, Button, message } from 'antd';
import { useState } from 'react';
import { service } from '@/utils/service';

const DeleteConfirmModal = ({ visible, teacher, onCancel, onSuccess }) => {
  const [loading, setLoading] = useState({
    dissolve: false,
    delete: false
  });

  // 解散班级群
  // 修改 pages/Teacher/components/DeleteConfirmModal.jsx 中的 handleDissolve 方法
    const handleDissolve = async () => {
    setLoading(prev => ({ ...prev, dissolve: true }));
    try {
        // 按照新要求修改请求地址、方式和参数
        const response = await service({
            url: '/store/api/release/teacher/classIn/course',
            method: 'POST',
            params: { id: teacher.id } // 请求参数为 {id: 老师id}
        });

        // 根据新的返回结果格式处理（code=0 为成功）
        if (response.code === 0) {
        message.success('解散老师ClassIn班级成功');
        } else {
        message.error(response.msg || '解散班级失败，请重试');
        }
    } catch (error) {
        // 捕获网络错误或其他异常
        message.error('网络请求异常，请稍后重试');
    } finally {
        setLoading(prev => ({ ...prev, dissolve: false }));
    }
    };

  // 确认删除
  const handleDelete = async () => {
    setLoading(prev => ({ ...prev, delete: true }));
    try {
      // 实际项目中替换为真实接口
      await service({
        url: `/api/teacher/${teacher.id}`,
        method: 'DELETE'
      });
      message.success('老师删除成功');
      onSuccess(); // 通知父组件更新列表
    } catch (error) {
      message.error('删除失败，请重试');
    } finally {
      setLoading(prev => ({ ...prev, delete: false }));
    }
  };

  if (!teacher) return null;

  return (
    <Modal
      title="删除确认"
      open={visible}
      onCancel={onCancel}
      centered={true}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button 
          key="confirm" 
          type="primary" 
          danger 
          loading={loading.delete}
          onClick={handleDelete}
        >
          确定
        </Button>
      ]}
      destroyOnClose
    >
      <div className="delete-confirm-content">
        <p className=' leading-8 mb-2'>确认删除【{teacher.name}】吗？删除后不能恢复！</p>

        <div className=' bg-[#dcdee2] p-3 text-center'>
            <p className="mt-2">是否先需要解散老师和学生的Classin班级群再删除呢？</p>
            
            <Button
                type="primary"
                className="mt-3 mb-3"
                onClick={handleDissolve}
                loading={loading.dissolve}
            >
            【解散该老师和学生所有的ClassIn班级群】
            </Button>
            <p className="text-red-500 mt-1">
            注意！！！该操作将会解散【{teacher.name}】和学生的所有ClassIn班级群，请谨慎操作！
            </p>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;