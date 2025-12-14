import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer, ProBreadcrumb , DragSortTable} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Breadcrumb, Button, Image, Switch } from 'antd';
import LayoutContainer from '../LayoutContainer';
import { message } from 'antd';
import { useState } from 'react';
import teacher from './data';
import classNames from 'classnames';
import DeleteConfirmModal from './DeleteConfirmModal';
// import { useLocation, useRouteMatch } from 'umi';

const HomePage = () => {
  const { name } = useModel('global');
  const [dataSource, setDataSource] = useState(teacher);
  const [category, setCategory] = useState(
    {
      1088: {
        "text": "15元外教",
      },
      1092: {
        "text": "20元外教",
      },
      1093: {
        "text": "25元外教",
      },
      1500: {
        "text": "中教",
      }
    }
  );//老师类型
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  
  const columns = [
    {
      title: '拖拽排序',
      dataIndex: 'sort',
      width: 80,
      className: 'drag-visible',
    },
    {
      title: '头像',
      width: 60,
      dataIndex: 'icon',
      render: (text, record, index, action)=>{
        return <>
          <Image
            width={40}
            height={40}
            src={text}
            preview={false}
          />
        </>
      }
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
      render: (text, record, index, action)=>{
        return <>
          <a
            className='link'
            onClick={()=>{
              showTeacher(record)
            }}
          >
            {text}
          </a>
        </>
      }
    },
    {
      title: '手机号/登录账号',
      dataIndex: 'mobile',
      width: 160
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 160,
    },
    {
      title: '是否展示',
      dataIndex: 'isOpen',
      width: 120,
      render: (text, record) => {
        return (
          <div
            className='flex items-center gap-2'
          >
            {/* 状态圆点 */}
            <div
              className={classNames(
                "w-4 h-4 rounded-full",
                text == 1 ? 'bg-52c41a' : 'bg-ff4d4f'
              )}
            />
            
            {/* Switch 组件 */}
            <Switch
              checked={text == 1 ? true : false}
              checkedChildren="展示"
              unCheckedChildren="隐藏"
              onChange={(checked) => {
                // 这里处理状态变更逻辑
                console.log('状态变更:', record.id, checked);
                const newData = data.map(item => {
                  if (item.id === id) {
                    return { ...item, isOpen: checked ? 1 : 0 };
                  }
                  return item;
                });
                setDataSource(newData);
                
                // 这里可以添加API调用，例如：
                // updateItemStatus(id, checked ? 1 : 0);
                // 实际使用时需要调用接口更新状态
              }}
            />
          </div>
        )
      },
    },
    {
      title: '老师分类',
      dataIndex: 'categoryId',
      className: '',
      valueEnum: category,
      render: (row, rowData) => {
        let text = ""
        // 检查当前值是否在 valueEnum 中存在
        if (category[rowData.categoryId]) {
          // 存在则按 valueEnum 规则显示（可复用 ProTable 的默认样式）
          text = category[rowData.categoryId].text;
        } else {
          // 不存在则返回自定义文本（如“未知状态”）
          text = "未分类：" + rowData.categoryId;
        }
        return (
          <div>{text}</div>
        );
      },

    },
    {
      title: '微信绑定',
      dataIndex: 'headimgUrl',
      className: '',
      width: 200,
      render: (text, record, index, action)=>{
        if(!record.openId){
          return <>
            未绑定
          </>
        }
        return (
          <div
            className='flex items-center gap-2'
          >
            
            <span>
              <Image
                width={40}
                height={40}
                src={text}
                preview={false}
              />
            </span>
            {/* 状态圆点 */}
            <div>
              <p>{record.nickName}</p>
              <a>
                解除绑定
              </a>
            </div>
          </div>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'name',
      className: '',
      render: (text, record, _, action) => {
        return <div className='flex gap-2'>
          <a
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            编辑
          </a><a
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            置顶
          </a>
          <a
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            上移
          </a>
          <a
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            下移
          </a>
          <a
            onClick={(e) => {
              e.preventDefault(); // 阻止默认链接行为
              handleOpenDeleteModal(record);
            }}
            key="delete"
          >
            删除
          </a>
        </div>
      }
    },
  ];

  function showTeacher(rowDate){
    console.log("展示老师详情", rowDate);
  }

    // 打开删除确认弹窗
  const handleOpenDeleteModal = (teacher) => {
    setCurrentTeacher(teacher);
    setDeleteModalVisible(true);
  };
  
    // 关闭删除确认弹窗
  const handleCloseDeleteModal = () => {
    setDeleteModalVisible(false);
    setCurrentTeacher(null);
  };

  // 处理删除成功后的回调
  const handleDeleteSuccess = () => {
    // 从数据源中移除已删除的老师
    const newData = dataSource.filter(item => item.id !== currentTeacher.id);
    setDataSource(newData);
    setDeleteModalVisible(false);
    setCurrentTeacher(null);
  };


    const handleDragSortEnd = (
      beforeIndex,
      afterIndex,
      newDataSource,
    ) => {
      console.log('排序后的数据', newDataSource);
      setDataSource(newDataSource);
      message.success('修改列表排序成功');
    };
  
  return (
    <LayoutContainer
    >
      <DragSortTable
        columns={columns}
        rowKey="id"
        search={false}
        pagination={false}
        dataSource={dataSource}
        dragSortKey="sort"
        onDragSortEnd={handleDragSortEnd}
        size="small"
      />
      <DeleteConfirmModal
        visible={deleteModalVisible}
        teacher={currentTeacher}
        onCancel={handleCloseDeleteModal}
        onSuccess={handleDeleteSuccess}
      />
    </LayoutContainer>
  );
};

export default HomePage;
