import { ArrowRightOutlined, MinusOutlined, PlusOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Divider, Select, Modal, Button } from 'antd';
import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useMemo } from 'react';

//res
import icon from '../public/icon.png';
import left_pic from '../public/left.png';
import cloths from '../public/cloths.png';

//redux

//Context
import { createContext, useContext } from 'react';
var NameContext = createContext('');

//useState
import { useState } from 'react';

//Var
var cloth_size: any; //tmp
var obj = {}; //obj记录每一件衣服此时选中的大小
var id = [0,1,2,3,4,5];
var price = [25,25,25,25,25,25];
var name = ['Avo','Bubble','Creemee','Film','Watermelon','Pineapple'];
var cart :any= {}; //cart为字典，key为由衣服id和衣服size拼接组成的key，值为cnt，price，name
var general_ids: any =[];
var tmp :any= {
  'cloth_name': null,
  'cloth_price': null,
  'cloth_size':null,
};

//notice
import { notification, Space } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
const Context = React.createContext({ name: 'Default' });

const Home: NextPage = () => {
  // 弹窗函数
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  //cnt
  const [cnt, setCnt] = useState(0);
  function updateCnt(type:any){
    console.log('type',type)
    switch(type){
      case 'inc': {
        console.log('add')
        setCnt(cnt+1);
        break;
      }
      case 'dec': {
        console.log('dec');
        setCnt(cnt-1);
        break;
      }
      case 'clear' : {
        console.log('clear');
        cart = {};
        general_ids = [];
        updateCartLs(general_ids);
        updateCartState(cart);
        setCnt(0);
        break;
      }
    }
  }
  
  //cart state
  const [cartState,setCartState] = useState({});
  function updateCartState(state:any){
    setCartState(state);
  }

  //cart Ls
  const [cartLs,setCartLs] = useState([]);
  function updateCartLs(ls:any){
    const list = ls.slice();
    setCartLs(list);
  }

  //Size
  const handleChange = (value: string, label: any) => {
    const id = value.split('_')[0];
    cloth_size = label['label'];
    obj[id]=cloth_size;
  };

  //notice
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification ${placement}`,
      description: <Context.Consumer>{({ name }) => `${name}`}</Context.Consumer>,
      placement,
    });
  };
  const contextValue = useMemo(() => ({ name: '更新成功！！！' }), []);
  
  //Add to Cart
  //每次点击 Add to Cart 都会动态更新Cart中的组件
  // cloth_name cloth_size cnt cloth_price id
  function buttonHandler(e: any){
    //notice
    () => openNotification('topLeft');

    const id = e.currentTarget.getAttribute('id').split('_')[0];
    const general_id = id+obj[id];
    if(cart[general_id]==undefined){
      //则需要添加新的项，否则只是更新数据即可
      cart[general_id]={};
      cart[general_id]['cloth_name']=name[parseInt(id)-1];
      cart[general_id]['cloth_size']=obj[id];
      cart[general_id]['cnt']=0;
      cart[general_id]['cloth_price']=0;
      cart[general_id]['id']=general_id;
      general_ids.push(general_id);
      console.log('general_ids',general_ids);
    }
    cart[general_id]['cnt']++;
    cart[general_id]['cloth_price']+=price[parseInt(id)];
    console.log(cart);
    updateCartState(cart);
    updateCartLs(general_ids);
    updateCnt('inc');
  }

  //Bubble handler
  function minusHandler(e:any){
    console.log('minus',e.currentTarget.id);
    const id = e.currentTarget.id;
    console.log(id);

    cart[id]['cnt']--;
    cart[id]['cloth_price']-=price[parseInt(id[0])];
    updateCnt('dec');
    if(cart[id]['cnt']==0){
      delete cart[id];
      general_ids.splice(general_ids.indexOf(cart[id]),1);
    }
    updateCartState(cart);
    updateCartLs(general_ids);
  }

  function plusHandler(e:any){
    const id = e.currentTarget.id;
    console.log('plus',id);
    cart[id]['cnt']++;
    cart[id]['cloth_price']+=price[parseInt(id[0])];
    updateCnt('inc');
    updateCartState(cart);
  }

  function Bubble(props:any){
    return(
      // container
      <div className='flex flex-col w-full z-auto' id='Bubble'> 
        {/* image container */}
        <div className='self-auto relative align-middle mx-8 max-h-64'>
          <Image alt='cloth' src={cloths}/>
        </div>

        {/* content */}
        <div className='pt-5 w-36 mx-auto'>
          {/* header */}
          <div className='-mt-1 font-bold text-lg inline-block'>
            {props.props['cloth_name']}
          </div>
          {/* meta */}
          <div className='my-2 block'>
            {props.props['cloth_size']}
          </div>
          {/* quantity */}
          <div className='flex'>
            <MinusOutlined onClick={minusHandler} id={props.props['id']} style={{fontSize:'30px', color:'red'}} className='items-start cursor-pointer block text-center align-baseline border border-red-500 rounded'/>
            <div className='mx-1 flex w-10 align-middle relative my-auto border-gray-400 border rounded'>
              <span className='mx-auto font-bold'>{props.props['cnt']}</span>
            </div>
            <PlusOutlined onClick={plusHandler} id={props.props['id']} style={{fontSize:'30px', color:'gray'}} className='items-start cursor-pointer block text-center align-baseline border border-green-600 rounded'/>
          </div>
        </div>

        {/* price */}
        <div className='relative block left-0 top-0 w-36'>
          <div className='ml-2 my-1 float-right font-bold text-lg text-left '>
            {'$'+props.props['cloth_price']+'.00'}
          </div>
        </div>
      </div>
    )
  }

  //cloth container
  function Cloth(e:any){
    const id = e.id;
    return(
      <div className='card-container'>
        <div className='card'>
          <Image src={cloths} alt='cloths' className='block overflow-clip relative align-middle'/>
          <div className='card-content'>
            <div className='card-header' id={id+'_name'}>{name[id]}</div>
            <div className='card-meta' id={id+'_price'}>$25.00</div>
            <div className='card-description'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Praesent quis cursus nibh, ac finibus leo. Pellentesque 
              semper sed est consectetur facilisis.
            </div>
            <Select
              id={id+'_select'}
              defaultValue="Select Size"
              className='card-listbox'
              onChange={handleChange}
              options={[
                { value: id+'_small', label: 'Small' },
                { value: id+'_medium', label: 'Medium' },
                { value: id+'_large', label: 'Large' },
              ]}
            />
            <Context.Provider value={contextValue}>
              {contextHolder}
              <button className='card-button' id={id+'_button'} onClick={(e)=>{buttonHandler(e)}}>
                <span id={id+'_button'} onClick={() => openNotification('topLeft')}>Add to Cart</span>
                <div className='inline-block align-center ml-2'>
                  <ArrowRightOutlined />
                </div>
              </button>
            </Context.Provider>
          </div>
        </div>
      </div>
    )
  }

  //header
  function Header(){
    return(
      <div className='flex w-full my-4 mt-0 mx-0 border border-solid divide-gray-500 shadow-sm'>
        <div className='w-5/6 flex my-0 mx-auto box-shadow-none relative'>
          {/* icon */}
          <div className='relative align-middle p-4'>  
            <Image src={icon} alt='icon' width="40"/>
          </div>
          {/* search */}
          <div className='flex ml-auto items-center relative align-middle p-4'>
            <div className='relative -my-2 border border-solid divide-gray-500 items-center rounded'>
              <input type="text" placeholder='Search...' className='pt-2 pr-9 pb-2 m-0'/>
              <div className='items-center relative inline-flex pr-1 m-0'>
                <SearchOutlined/>
              </div>
            </div>
          </div>
          {/* cart */}
          <div className='flex items-center relative px-4 py-3 cursor-pointer' onClick={showModal}>
            <div className='bg-green-400 block font-bold text-sm ml-3 align-baseline p-2 rounded' id='cart-container'>
              <ShoppingCartOutlined style={{ fontSize: '30px' }}/>
              <span className='ml-2' id='cart-content'>{cnt}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  //Left
  function Left(){
    return(
      <div className='mb-3.5 text-left px-5 pb-3 pt-0 w-2/6 relative inline-block'>
        <div className='block shadow-sm m-0 border border-gray-200 rounded '>
          <Image src={left_pic} alt='left_pic' className='block align-middle bg-transparent border-none '/>
          <hr />
          {/* Clothing container */}
          <div className='menu-container'>
            {/* header */}
            <div className='header-text'> Clothings </div>
            {/* menu */}
            <div className='menu'>
              <div className='normal-text'>Shirts</div>
              <div className='normal-text'>Sweatshirts</div>
              <div className='normal-text'>Tank Tops</div>
            </div>
          </div>
          <hr />
          {/* Misc container */}
          <div className='menu-container'>
            {/* header */}
            <div className='header-text'> Misc </div>
            {/* menu */}
            <div className='menu'>
              <div className='normal-text'>Hats</div>
              <div className='normal-text'>Jewerly</div>
              <div className='normal-text'>Seities X Collection</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function Right(){
    return(
      <div className='text-left px-5 py-3 w-4/6 relative inline-block align-top'>
        <Divider>'SHOP ALL PRODUCTS'</Divider>
        {/* right container */}
        <div className='-p-3 items-stretch flex-row flex flex-wrap justify-center text-center'>
          {/* card container */}
          {id.map(id=>(
            <Cloth key={id} id={id}/>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      {/* 弹窗 */}
      <Modal title="Cart" open={isModalOpen}
        footer={[
          <Button
          key='clearAll'
          onClick={updateCnt.bind(this,'clear')}
          className='border-red-400 rounded text-red-400'
          >
            清空
          </Button>,
          <Button
          key='ok'
          onClick={handleOk}
          className='border-blue-400 rounded text-blue-400'
          >
            完成
          </Button>
        ]}
      >
        <div className='p-10 text-left'>
          <div id='bubble' className='my-5'>
            {cartLs.map(cartLi=>(
              <Bubble key={cartLi} props={cartState[cartLi]}/>
            ))}
          </div>
        </div>
      </Modal>

      {/* header */}
      <Header/>

      <main className="flex w-full flex-1 flex-row flex-wrap items-stretch justify-center text-center">
        {/* left part */}
        <Left/>

        {/* right part */}
        <Right/>
        
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t text-white bg-black ">
        Copyright © Your Website 2020
      </footer>
    </div>
  )
}

export default Home
