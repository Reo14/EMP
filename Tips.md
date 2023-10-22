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

## Qixin
测试了下API 除了emergence和onboarding 我需要再想想逻辑以外 别的基本都没问题 当然我只用了postman 如果前端运行时有任何问题直接找我

## Qixin
Personal Information页的信息显示不全 而且没有和id绑定 已和xiaoxuan沟通
Hr获取所有申请人信息时 <Td>{employee.Employment?.visaTitle || 'N/A'}</Td> 这一句由于目前还没有完成完整的信息注册 暂时难以test 待办


