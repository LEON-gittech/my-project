import { ArrowRightOutlined, RightOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Divider, Select } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import icon from '../public/icon.png';
import left_pic from '../public/left.png';
import cloths from '../public/cloths.png';

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

var cnt=0;

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      {/* header */}
      <div className='flex w-full my-4 mt-0 mx-0 border border-solid divide-gray-500 shadow-sm'>
        <div className='w-5/6 flex my-0 mx-auto box-shadow-none relative'>
          {/* icon */}
          <div className='relative align-middle p-4'>  
            <Image src={icon} alt='icon' width="40"/>
          </div>
          {/* search */}
          <div className='flex ml-auto items-center relative align-middle p-4'>
            <div className='relative -my-2 border border-solid divide-gray-500 items-center'>
              <input type="text" placeholder='Search...' className='pt-2 pr-9 pb-2 m-0'/>
              <div className='items-center relative inline-flex pr-1 m-0'>
                <SearchOutlined/>
              </div>
            </div>
          </div>
          {/* cart */}
          <div className='flex items-center relative px-4 py-3 cursor-pointer'>
            <div className='bg-green-400 block font-bold text-sm ml-3 align-baseline p-2'>
              <ShoppingCartOutlined style={{ fontSize: '30px' }}/>
              <span className='ml-2'>{cnt}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="flex w-full flex-1 flex-row flex-wrap items-stretch justify-center text-center">
        {/* left part */}
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

        {/* right part */}
        <div className='text-left px-5 py-3 w-4/6 relative inline-block align-top'>
          <Divider>'SHOP ALL PRODUCTS'</Divider>
          {/* right container */}
          <div className='-p-3 items-stretch flex-row flex flex-wrap justify-center text-center'>
            <div className='card-container'>
              <div className='card'>
                <Image src={cloths} alt='cloths' className='block overflow-clip relative align-middle'/>
                <div className='card-content'>
                  <div className='card-header'>Avo</div>
                  <div className='card-meta'>$25.00</div>
                  <div className='card-description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Praesent quis cursus nibh, ac finibus leo. Pellentesque 
                    semper sed est consectetur facilisis.
                  </div>
                  <Select
                    defaultValue="Select Size"
                    className='card-listbox'
                    onChange={handleChange}
                    options={[
                      { value: 'Small', label: 'Small' },
                      { value: 'Medium', label: 'Medium' },
                      { value: 'Large', label: 'Large' },
                    ]}
                  />
                  <button className='card-button'>
                    <span >Add to Cart</span>
                    <div className='inline-block align-center ml-2'>
                      <ArrowRightOutlined />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t text-white bg-black ">
        Copyright © Your Website 2020
      </footer>
    </div>
  )
}

export default Home
