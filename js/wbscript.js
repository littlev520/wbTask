
//批量微博任务(521,"刷微博");

function 批量微博任务(startIndex, 任务类型)
{
    while(true){
        if(微博任务(startIndex++,任务类型))
        {
                log("本次执行成功,将继续执行="+startIndex);
                if(app.getPackageName(index+"")){
                    
                }else{
                    log("所有的分身用完了="+startIndex);
                    break;
                }
        }else{

            log("执行到没有能继续执行的理由。。");
            break;
        }
    }
}
function 微博任务(index,任务类型) {
    app.launchApp(index+"");
    sleep(5000);
    每次任务开始要做的事情(index);
    if(!登录())
    {
        return false;
    }
     switch(任务类型){
         case 1:
            滚动微博();
            进入日常任务();
           // 向下滑动屏幕();

         break;
         case 2:
             mysleep(1000,2000);
            进入日常任务();
            提现任务();
          //  向下滑动屏幕();
         break;
         case 3:
            滚动微博();
            提现任务();
            进入日常任务();
        //    向下滑动屏幕();
         break;
     }
    
   // 进入日常任务();
    向下滑动屏幕();
    每次任务完成后要做的事情();
    return true;
}

function 登录() {
    是否要登录 = desc("登录").findOne(5000);
    if (是否要登录) {
        登录按钮 = desc("登录").findOne().parent().parent();
        
        登录按钮.click();
        账号密码登录按钮 = id("tv_for_psw_login").findOne();
        if (账号密码登录按钮) {
            账号密码登录按钮.click();
            //获取账号密码
           账号密码 = 查找账号文件并读取账号();

           if(账号密码)
           {
            setText(0, 账号密码[0]);
            mysleep(500);
            setText(1, 账号密码[1]);
            mysleep(500);
            click("登录");
            mysleep(5000,8000);
            人机验证点击小灰点();
            判断是否需要滑动破解();
            return true;
           }else{
               toastLog(  "没有账号了");
               return false;
           }
            
        }
        
    }else{
        log("不需要登录。。。");
        return true;
    }
}

function 关闭给我评分()
{

  log("准备随时关闭给我评分");
  
  //随时关闭给我评分的提示
  className("android.widget.TextView").text("给我们评分").waitFor();
  className("android.widget.TextView").text("不了，谢谢").findOne().click();
   
  
  log("准备随时关闭给我评分");
}

function 关闭连续签到对话框(){
    className("android.view.View").descContains("签到").descContains("恭喜").waitFor();
    Tap(569,1371);//直接点击坐标
}
function 执行任务后台线程(){

     threads.start(关闭给我评分);
    threads.start(关闭连续签到对话框);
}
function 每次任务开始要做的事情(index)
{
    关闭之前的应用(index-1);
    sleep(1000);
    执行任务后台线程();
}

function 关闭之前的应用(index) {
    var cmdStr = "am force-stop " + app.getPackageName(""+index);
    log(cmdStr);
    shell(cmdStr, true);
}
function 判断是否需要滑动破解() {
    var 滑动提示条 = className("android.view.View").desc("拖动滑块完成拼图").findOne(5000);
    if (滑动提示条) {
        滑动验证破解(滑动提示条);
    }
}

function 滑动验证破解(滑动提示条) {
    if (!requestScreenCapture()) {
        toast("请求截图失败");
        exit();
    }
    captureScreen("/sdcard/滑动验证图片.png");
    var src = images.read("/sdcard/滑动验证图片.png");

    var 验证提示条 = className("android.view.View").desc("请完成验证").findOne(5000);
    //log(src)
   
    y =  验证提示条.parent().bounds().bottom+5;
  
    h = 滑动提示条.bounds().top-3-y;
    裁剪图片 = images.clip(src, 0, y, device.width, h);
    //log(裁剪图片)
  //  images.save(裁剪图片, "/sdcard/clip.png");
  //  app.viewFile("/sdcard/clip.png");
    username = "littlev520";
    password = "!wzw861012";
    联众返回数据 = getCode(username, password, 裁剪图片).data.res;
    console.log(联众返回数据);
    var x1 = parseInt(联众返回数据.split("|")[0].split(",")[0]); //正则x1坐标
    var x2 = parseInt(联众返回数据.split("|")[1].split(",")[0]); //正则x2坐标
    var 滑动的纵坐标 = 滑动提示条.bounds().centerY();
    log(x1, x2);
    randomSwipe(x1, 滑动的纵坐标, x2, 滑动的纵坐标);
}

function randomSwipe(x1,y1,x2,y1){
    //设置随机滑动时长范围
    var timeMin=500
    var timeMax=1000
    // 假设多滑过去多少，然后再滑回来
    var distance  = random(10,20);
    
   // mySwipe(x1,y1,x1,y1,random(500,600));//先长按在起始地点
    //然后 开始滑动
    mySwipe(x1,y1,x2,y1,random(timeMin,timeMax));//先长按在起始地点

   // mySwipe(x2+distance,y1,x2,y1,random(0,100));//先长按在起始地点
   
}
function 每次任务完成后要做的事情(){

   // 切换网络();
    threads.shutDownAll();
}

function  开启飞行模式(){

    toastLog("开启飞行模式");

    var  开启飞行模式执行1 = "settings put global airplane_mode_on 1";
var  开启飞行模式执行2 ="am broadcast -a android.intent.action.AIRPLANE_MODE --ez state true";
shell(开启飞行模式执行1,true);
sleep(500);
shell(开启飞行模式执行2,true);



}

function  关闭飞行模式(){

    toastLog("关闭飞行模式");
    var  关闭飞行模式执行1 = "settings put global airplane_mode_on 0";
var  关闭飞行模式执行2 ="am broadcast -a android.intent.action.AIRPLANE_MODE --ez state false";
shell(关闭飞行模式执行1,true);
sleep(500);
shell(关闭飞行模式执行2,true);
}

function  切换网络(){

    threads.start(开启飞行模式);
    sleep(2000);
    threads.start(关闭飞行模式);
    sleep(2000);


}

function 进入日常任务(){

    var checkIn_button = id("rlredpacketSave").findOne();
        checkIn_button.click();
    mysleep(2000,3000);
    if(className("android.view.View").descContains("签到").descContains("恭喜").exists()){
        Tap(569,1371);//直接点击坐标
        Tap(560,1365);//直接点击坐标
        sleep(2000,3000);
    }
    if(className("android.view.View").descContains("签到").descContains("恭喜").exists()){
        log("有一个悬浮框框，需要返回去了");
        back();
        mysleep(1000,2000);
        var checkIn_button = id("rlredpacketSave").findOne();
        checkIn_button.click();
      }else{
        log("没有找到。。。");
      }
  }
  function 向下滑动屏幕(){

    //要等带一个控件的出现
    滚动次数  = random(3,5);
    for(i=0;i<滚动次数;i++){
  
         x1 = random(device.width*0.1,device.width*0.9);
         y2 = random(device.height*0.2,device.height*0.3);
  
         x2 = random(x1,x1+device.width*0.1);
         y1 = random(device.height*0.7,device.height*0.9);
        
         duration = random(500,900);
         mySwipe(x1, y1, x2, y2, duration);
        sleep(1000,2000);
    }

  }
  function 滚动微博(){
    checkIn_button = id("rlredpacketSave").findOne();//要有这个代表登录成功了才
    滚动次数  = random(5,10);
    for(i=0;i<滚动次数;i++){
  
         x1 = random(device.width*0.1,device.width*0.9);
         y1 = random(device.height*0.3,device.height*0.5);
  
         x2 = random(x1,x1+device.width*0.1);
         y2 = random(device.height*0.7,device.height*0.9);
        
         duration = random(500,900);
         mySwipe(x1, y1, x2, y2, duration);
        sleep(2000,4000);
    }
  }

  function 提现任务() {
    className("android.widget.Button").desc("提现").waitFor();
    账户余额 = descStartsWith("￥").findOne().contentDescription;
    //console.log(账户余额);
    console.log("还有多少钱" + 账户余额);
    let 可取现的钱 = parseInt(账户余额.replace("￥", ""));
    if (可取现的钱 < 3) {
    }
    else {
        className("android.widget.Button").desc("提现").click();
        sleep(1000);
        选择要点击金额(可取现的钱);
        sleep(1000);
        Tap(random(450, 570), random(1490, 1520));
        sleep(1000);
        Tap(random(587, 800), random(1140, 1200));
    }
}

/*
 3  元的坐标  y 854-1000  x（255，370） 5（480,600）
             20(1080,1140)

*/

function 选择要点击金额(金额){

    let x;
    let y;
    if(金额<5){
       //那就取三块的
       x = random(255,370);
       y = random(854,1000 );
       Tap(x,y);
       return;
      
    }else if(金额<10){
        x = random(480,600);
        y = random(854,1000 );
        Tap(x,y);
        return;

    }else if(金额<20){
        x = random(480,600);
        y = random(854,1000 );
        Tap(x,y);
        return;

    }

    else {
        x = random(255,370);
        y = random(1080,1140 );
        Tap(x,y);
        return;

    }
}
function mySwipe(x1, y1, x2, y2, duration)
{ if(device.sdkInt<24)
    {
        Swipe(x1, y1, x2, y2, duration);
    }else
    {
        swipe(x1, y1, x2, y2, duration);
    }
    
}
function 人机验证点击小灰点() {
    if (desc("点击按钮进行验证").exists()) {
        //click("点击按钮进行验证");
        // sleep(500);
        //click("点击按钮进行验证");
        小灰点 = className("android.view.View").depth(8).findOne();
        log(小灰点);
        小灰点坐标 = 小灰点.bounds();
        mySwipe(小灰点坐标.centerX()+100,小灰点坐标.centerY()+100,小灰点坐标.centerX()+120,小灰点坐标.centerY()+120,500);
        Tap(小灰点坐标.centerX(), 小灰点坐标.centerY());
    }
    else {
        toastLog("其他情况");
    }
}
function 查找账号文件并读取账号() {
    账号文件列表 = 查找sdcard目录下账号文件();
    if (账号文件列表.length == 0) {
        toastLog("不存在账号或者账号格式不对【根目录(账号xxkeys.txt)】,脚本退出");
    }
    else {
        log("/sdcard/" + 账号文件列表[0]);
        账号文件路径 = "/sdcard/" + 账号文件列表[0];
        return 读取账号密码(账号文件路径);
       
    }
}
function 查找sdcard目录下账号文件(){

    var dir = "/sdcard/";
   
    var 账号Files = files.listDir(dir, function(name){
        return name.endsWith(".js") && files.isFile(files.join(dir, name));
    });
    log(账号Files);
}

function 查找sdcard目录下账号文件(){

    var dir = "/sdcard/";
   
    var 账号Files = files.listDir(dir, function(name){
        return name.startsWith("账号")&&name.endsWith(".txt") && files.isFile(files.join(dir, name));
    });
    return 账号Files;
}

function 读取账号密码(filePath){
    file = open(filePath, "r")
    //读取一行并打印
    var 内容 = file.readline();
    toastLog(内容);
    if(内容!=""){
        log(内容);
        file.close();
        var 账号密码 = 内容.split("----");
        if(账号密码)
        log(账号密码);
        var 账号 = 账号密码[0];
        log(账号);
        var 密码 = 账号密码[1];
        log(密码)
        删除账号(filePath);
        return 账号密码;
    }else{
        return null;
    }
   
    
}

function 删除账号(path) {

    //file = open(path,"r");
    //删除第一行
    var reg = /^\s+|s+$/g; //匹配无效空白行
    var txt = files.read(path).replace(reg, "").split("\n");
    let ret_text = txt[0];
    log(ret_text.length);
    if (txt != "") {
        txt.splice(0, 1);
        files.write(path, txt.join("\n"));
        if (ret_text.length > 0) {
            return ret_text.trim();

        }
    } else {
        return "没有号了"
    }

  //  file.close();
}
function mysleep(min,max){
    if(max==null||min>max)
    {
        max = min+1000;
    }
    sleep(random(min, max)); //随机一个时间
}

module.exports = 批量微博任务;
