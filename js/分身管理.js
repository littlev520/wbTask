/*var storage = storages.create("微博任务配置");
分身开始index = storage.get("分身开始index", 1);
   分身结束index =  storage.get("分身结束index", 500);
  
批量创建分身(分身开始index,分身结束index);*/

function 批量创建分身(start_index,end_index){
  for(分身index =start_index;分身index<=end_index;分身index++){
    创建微博分身(分身index);
    sleep(2000);
  }
  back();
  sleep(500);
  back();
}



function 创建微博分身(分身名称) {
    app.launchApp("多开分身");
    创建分身的按钮 = id("iv_btn_create").findOne();
    //log(创建分身的按钮);
    创建分身的按钮.click();
    //找到 微博空间的爸爸
    微博控制栏 = text("微博").findOne().parent().parent();
    
   // log(微博控制栏);
    微博制作分身按钮 = 微博控制栏.findOne(text("制作分身"));
   // log(微博制作分身按钮);
    微博制作分身按钮.click();
   
    //查找机型伪装按钮
    机型伪装设置按钮 = text("机型伪装").findOne().parent().parent().findOne(text("设置"));
   // log(机型伪装设置按钮);

    setText(分身名称);
    sleep(1000);
    机型伪装设置按钮.click();
    机型伪装设置();
    虚拟定位按钮 = text("虚拟定位").findOne().parent().parent().findOne(text("设置"));
  //  log(虚拟定位按钮);
    虚拟定位按钮.click();
    虚拟位置设置();
    text("开始制作").findOne().click();
    text("允许").findOne().click();
    text("安装").findOne().click();
    text("完成").findOne().click();
}

function 生成随机的位置搜索关键字(){
  var msg = ["","小区","楼","路","号","栋","花园"];
  随机数  = random(0,msg.length-1);
  var  keyword =msg[随机数];
  位置搜索关键字="100";
  switch(keyword)
  {
    case "":
      位置搜索关键字 =random(1,500)+keyword;
    case "小区":
    case "花园":
      位置搜索关键字 = keyword+random(1,100);
        break;
    case "楼":
    case "栋":
      位置搜索关键字 =random(1,30)+keyword;
        break;
    case "号":
      位置搜索关键字 =random(1,200)+keyword;
          break;
        default:
          位置搜索关键字 =random(1,500)+keyword;
                 
  }

  return 位置搜索关键字;
   
}

function 虚拟位置设置(){
    id("tv_search").findOne().click();
    随机数  = random(1,100);
    sleep(1000);
    setText(生成随机的位置搜索关键字());
    click("搜索");
    sleep(1000);
   所有可选择的城市 =  id("tv_city").untilFind();
 //  log(所有可选择的城市);
   随时城市的代码 = random(0,所有可选择的城市.length-1);
   所有可选择的城市[随时城市的代码].parent().click();

   所有可选择的地址 = id("tv_name").untilFind();
   log("地址控件" +所有可选择的地址.length);

   随机地址的代码 = random(0,所有可选择的地址.length-1);
     所有可选择的地址[随机地址的代码].parent().click();
     text("定位到此").findOne().click();
   //  click("定位到此");
}

function 机型伪装设置(){
    //随机选择手机品牌
     手机品牌选择下拉框 = id("spinnerBrand").findOne();
    // log(手机选择下拉框);
    手机品牌选择下拉框.click();
     sleep(500);
     所有品牌  = className("android.widget.TextView").find();
 
    随机品牌代码 = random(0,所有品牌.length-1 );
    log(随机品牌代码);
    所有品牌[随机品牌代码].click();
    sleep(500);
 
    //随机选择手机型号
     手机型号选择下拉框 = id("spinnerModel").findOne();
     log(手机型号选择下拉框);
     手机型号选择下拉框.click();
     sleep(500);
     所有型号  = className("android.widget.TextView").find();
     
     if(所有型号.length>1){
         随机型号代码 = random(0,所有型号.length-1 );
     }else{
         随机型号代码 =0;
     }
    
    log(随机型号代码);
    所有型号[随机型号代码].click();
 
    //随机点击1-3次 换一换
 
    随机点击次数  = random(1,3);
    for(i =0;i<随机点击次数;i++){
        click("换一换");
        sleep(500);
    }
    click("启用机型伪装");
 
 
 }
 module.exports = 批量创建分身;