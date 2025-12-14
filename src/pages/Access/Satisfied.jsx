import React, { useState, useCallback } from 'react';
import { Input, Button, Modal } from 'antd';
const { TextArea } = Input;

export default () => {
  // 模态框显示状态
  const [isModalOpen, setIsModalOpen] = useState(true);
  // 选中的标签列表
  const [selectedLabels, setSelectedLabels] = useState([]);
  // 输入框内容
  const [textareaContent, setTextareaContent] = useState('');
  // 反馈理由列表
  const list = ["没有理解问题", "没有完成任务", "没有帮助", "编造事实", "废话太多", "其他"];

  // 切换标签选中状态
  const toggleLabel = useCallback((label) => {
    setSelectedLabels(prev => 
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  }, []);

  // 判断提交按钮是否可点击
  const isOkDisabled = !(selectedLabels.length > 0 || textareaContent.trim() !== '');

  // 处理提交反馈
  const handleOk = async () => {
    // 构造请求参数
    const params = {
      content: textareaContent.trim(),
      labels: selectedLabels
    };
    
    // 假代码：发送请求
    try {
      console.log('提交反馈参数:', params);
      // 实际使用时替换为真实请求
      // const response = await fetch('your-api-url', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(params),
      // });
      // const result = await response.json();
      setIsModalOpen(false);
    } catch (error) {
      console.error('提交反馈失败:', error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
      >
        不满意
      </Button>
      <Modal
        title="抱歉，让你有不好的感受"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: isOkDisabled,
          style: isOkDisabled ? { opacity: 0.6 } : {},
        }}
        okText="提交反馈"
      >
        <p className='text-[#7B7B7C] mb-3'>请选择理由帮助我们做得更好</p>
        <div className='flex gap-3 flex-wrap mb-4'>
          {list.map((item) => (
            <span
              key={item}
              className={`leading-8 px-2 rounded cursor-pointer transition-colors duration-200 ${
                selectedLabels.includes(item)
                  ? 'bg-[#FCF5F5] text-[#C50808]'
                  : 'bg-[#f5f5f5] text-[#020616]'
              }`}
              onClick={() => toggleLabel(item)}
            >
              {item}
            </span>
          ))}
        </div>
        <TextArea
          rows={5}
          placeholder="欢迎说说你的想法"
          maxLength={200}
          className='bg-[#F5F5F5]'
          value={textareaContent}
          onChange={(e) => setTextareaContent(e.target.value)}
        />
      </Modal>
    </>
  );
};