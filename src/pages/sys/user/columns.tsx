/*
 * @Author: zz
 * @Date: 2021-07-06 14:32:52
 * @LastEditors: zz
 * @LastEditTime: 2021-07-06 19:20:37
 */

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'age',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    // render: (tags) => (
    //   <>
    //     {tags.map((tag) => {
    //       let color = tag.length > 5 ? 'geekblue' : 'green';
    //       if (tag === 'loser') {
    //         color = 'volcano';
    //       }
    //       return (
    //         <Tag color={color} key={tag}>
    //           {tag.toUpperCase()}
    //         </Tag>
    //       );
    //     })}
    //   </>
    // ),
  },
  {
    title: 'Action',
    key: 'action',
    // render: (text, record) => (
    //   <Space size="middle">
    //     <a>Invite {record.name}</a>
    //     <a>Delete</a>
    //   </Space>
    // ),
  },
];

export default columns;
