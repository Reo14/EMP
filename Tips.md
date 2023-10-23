## Good luck
现阶段的工作Branch是phase1 请不要对main文件夹做update！！
现阶段的工作目录为Phase1 branch 请不要在main branch做update！！！

## Qixin 
创建了本项目 请阅读readme.md 按照其中的指示存放文件
完成backend部分schema和controller的demo

由于Userschema的属性太多 我将emergence contact和reference单独定义了schema

## Qixin
目前在EmployeeController中 修改个人资料我只设置了一个完整的函数 如果你需要抽象出专门的功能 例如修改签证状态 直接copy我的代码简单修改后即可

## Qixin
Backend的基础功能已完成

## Qixin
create personal information之前忘记pull了
error.message已经统一

## Wenfeng
1. 完成了后端HR发送邮件并且能够从收到的链接重定向到sign-up界面
2. sign-up 的redux已经整合
3. 增加了HRtest界面：用以发邮件，和LoggedIn界面，表示登录/注册成功
4. 后端增加了一个query API（未测试），目前用以validation，以后可以拓展作用

由于涉及一些关键改动，先请查看commit历史，了解改动以后再merge

其他：
1. 后端.env需要增加两行，会发在slack里
2. 后端在merge后再运行下npm i，因为装了个新module

## Xiaoxuan
复用并修改了SignIn，但遇到了问题，也就是handleLogin这个method，可能是需要调整signIn里传入的输入

## Xiaoxuan
1. 我这里已经rebase + merge完Wenfeng昨晚最新的提交的Employee-Redux；然后机遇他的那个版本加上了3b；

2. 3b UI完成，但是需要帮助React UI显示逻辑（比如点击某个按钮可以显示出form之类的操作），这里对我来说过于复杂，不知道怎么实现那几个按钮的逻辑；

3. 继续完成新页面 - Personal Information page

其他：
咱们每次个人push到自己的（或者哪个branch）可否在群里吱一声，我也每次说一下，这样我们在push之前都先rebase到对方最新的commit，然后再push。这样可以减少rebase时由于版本落后导致需要merge很多conflict的问题。

## Qixin
测试了下API 除了emergence和onboarding 我需要再想想逻辑以外 别的基本都没问题 当然我只用了postman 如果前端运行时有任何问题直接找我

## Qixin
Personal Information页的信息显示不全 而且没有和id绑定 已和xiaoxuan沟通
Hr获取所有申请人信息时 <Td>{employee.Employment?.visaTitle || 'N/A'}</Td> 这一句由于目前还没有完成完整的信息注册 暂时难以test 待办


## Wenfeng
onboardingPage经历了大改，现使用Formik库管理表单状态，之后的表单界面请参考本页面，并安装formik和yup这两个库

## Xiaoxuan
1. Sidebar基本已经完成

待办：
1. 还需要身份区别那里和hr那部分url绑定，来实现所有跳转（这些点已和Wenfeng沟通过情况）

2. 模仿大改后的onboardingPage，修改personal info page

3. personal info没和userId绑定