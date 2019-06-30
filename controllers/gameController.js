const UserM = require('../models/moksModel');
const uuid = require('uuidv4');
const nodemailer = require('nodemailer');
const sendgridTransport= require('nodemailer-sendgrid-transport');
const env = require('dotenv').config();

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key: process.env.SENDGRID_API_KEY
    }
}));

exports.getFishingPageLesson = async (req, res) => {
   const userMain = await isLoggedIn(req);
    res.render('./moks/fishingLesson',{
       userMain
    });
}
exports.getFishing = async(req, res) => {
    const userMain = await isLoggedIn(req);
    if(userMain.status){
       res.render('./moks/fishing',{
       userMain
    });
    }else{
       res.redirect('/login')
    }
    
};

exports.postFish = async ( req, res) =>{
    const user = await isLoggedIn(req);
    if(!user) res.redirect('/');
    const link = `http://localhost:3000/friend/${uuid()}`;

    try {
     const updatelink = await UserM.update(
        { link },
        { where: { id: user.id }});

    console.log(`postFish win result----> ${updatelink}`); 
    } catch (err) {
        console.log(`postFish result ---->${err}`);
    };
    
    const name = req.body.name;
    const surname = req.body.surname;
    const hobby = req.body.hobby;
    const email = req.body.email;

    console.log(name)
    console.log(surname);
    console.log(hobby);

    
    transporter.sendMail({
        to: email,
        from: 'kiguno1996@gmail.com',
        subject: "Ты можешь стать кем угодно!!",
        html: `<html xmlns="http://www.w3.org/1999/xhtml"><head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Minty-Multipurpose Responsive Email Template</title>
        <style type="text/css">
           /* Client-specific Styles */
           #outlook a {padding:0;} /* Force Outlook to provide a "view in browser" menu link. */
           body{width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0;}
           /* Prevent Webkit and Windows Mobile platforms from changing default font sizes, while not breaking desktop design. */
           .ExternalClass {width:100%;} /* Force Hotmail to display emails at full width */
           .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} /* Force Hotmail to display normal line spacing.  More on that: http://www.emailonacid.com/forum/viewthread/43/ */
           #backgroundTable {margin:0; padding:0; width:100% !important; line-height: 100% !important;}
           img {outline:none; text-decoration:none;border:none; -ms-interpolation-mode: bicubic;}
           a img {border:none;}
           .image_fix {display:block;}
           p {margin: 0px 0px !important;}
           
           table td {border-collapse: collapse;}
           table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; }
           /*a {color: #e95353;text-decoration: none;text-decoration:none!important;}*/
           /*STYLES*/
           table[class=full] { width: 100%; clear: both; }
           
           /*################################################*/
           /*IPAD STYLES*/
           /*################################################*/
           @media only screen and (max-width: 640px) {
           a[href^="tel"], a[href^="sms"] {
           text-decoration: none;
           color: #ffffff; /* or whatever your want */
           pointer-events: none;
           cursor: default;
           }
           .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {
           text-decoration: default;
           color: #ffffff !important;
           pointer-events: auto;
           cursor: default;
           }
           table[class=devicewidth] {width: 440px!important;text-align:center!important;}
           table[class=devicewidthinner] {width: 420px!important;text-align:center!important;}
           table[class="sthide"]{display: none!important;}
           img[class="bigimage"]{width: 420px!important;height:219px!important;}
           img[class="col2img"]{width: 420px!important;height:258px!important;}
           img[class="image-banner"]{width: 440px!important;height:106px!important;}
           td[class="menu"]{text-align:center !important; padding: 0 0 10px 0 !important;}
           td[class="logo"]{padding:10px 0 5px 0!important;margin: 0 auto !important;}
           img[class="logo"]{padding:0!important;margin: 0 auto !important;}
  
           }
           /*##############################################*/
           /*IPHONE STYLES*/
           /*##############################################*/
           @media only screen and (max-width: 480px) {
           a[href^="tel"], a[href^="sms"] {
           text-decoration: none;
           color: #ffffff; /* or whatever your want */
           pointer-events: none;
           cursor: default;
           }
           .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {
           text-decoration: default;
           color: #ffffff !important; 
           pointer-events: auto;
           cursor: default;
           }
           table[class=devicewidth] {width: 280px!important;text-align:center!important;}
           table[class=devicewidthinner] {width: 260px!important;text-align:center!important;}
           table[class="sthide"]{display: none!important;}
           img[class="bigimage"]{width: 260px!important;height:136px!important;}
           img[class="col2img"]{width: 260px!important;height:160px!important;}
           img[class="image-banner"]{width: 280px!important;height:68px!important;}
           
           }
        </style>
  
        
     </head>
  <body>
  <div class="block">
     <!-- Start of preheader -->
     <table width="100%" bgcolor="#f6f4f5" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="preheader">
        <tbody>
           <tr>
              <td width="100%">
                 <table width="580" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                  
                 </table>
              </td>
           </tr>
        </tbody>
     </table>
     <!-- End of preheader -->
  </div>
  <div class="block">
     <!-- start of header -->
     <table width="100%" bgcolor="#f6f4f5" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="header">
        <tbody>
           <tr>
              <td>
                 <table width="580" bgcolor="#0db9ea" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth" hlitebg="edit" shadow="edit">
                    <tbody>
    
                          </td>
                       </tr>
                    </tbody>
                 </table>
              </td>
           </tr>
        </tbody>
     </table>
     <!-- end of header -->
  </div><div class="block">
     <!-- image + text -->
     <table width="100%" bgcolor="#f6f4f5" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="bigimage">
        <tbody>
           <tr>
              <td>
                 <table bgcolor="#ffffff" width="580" align="center" cellspacing="0" cellpadding="0" border="0" class="devicewidth" modulebg="edit">
                    <tbody>
                       <tr>
                          <td width="100%" height="20"></td>
                       </tr>
                       <tr>
                          <td>
                             <table width="540" align="center" cellspacing="0" cellpadding="0" border="0" class="devicewidthinner">
                                <tbody>
                                   <tr>
                                      <!-- start of image -->
                                      <td align="center">

                                         <a href="https://imgbb.com/"><img src="https://i.ibb.co/47JC6JS/len1.png" alt="len1"  width="340" border="0" height="282" alt="" style="display:block; border:none; outline:none; text-decoration:none;></a>
                                      </td>
                                   </tr>
                                   <!-- end of image -->
                                   <!-- Spacing -->
                                   <tr>
                                      <td width="100%" height="20"></td>
                                   </tr>
                                   <!-- Spacing -->
                                   <!-- title -->
                                   <tr>
                                      <td style="font-family: Helvetica, arial, sans-serif; font-size: 18px; color: #333333; text-align:left;line-height: 20px;" st-title="rightimage-title">
                                         У вас появилась уникальная возможность участия в нашем конкурсе!!!
                                      </td>
                                   </tr>
                                   <!-- end of title -->
                                   <!-- Spacing -->
                                   <tr>
                                      <td width="100%" height="20"></td>
                                   </tr>
                                   <!-- Spacing -->
                                   <!-- content -->
                                   <tr>
                                      <td style="font-family: Helvetica, arial, sans-serif; font-size: 13px; color: #95a5a6; text-align:left;line-height: 24px;" st-content="rightimage-paragraph">
                                       Уважаемый ${name}  ${surname} Пройдите регистрацию на нашем сайте, смотрите ссылку ниже, и вы сможете побороться за денежный приз с другими участниками не выхоодя из дома, а также получиить курс по вашим интересам, например ${hobby}
                                      </td>
                                   </tr>
                                   <!-- end of content -->
                                   <!-- Spacing -->
                                   <tr>
                                      <td width="100%" height="10"></td>
                                   </tr>
                                   <!-- button -->
                                   <tr>
                                      <td>
                                         <table height="30" align="left" valign="middle" border="0" cellpadding="0" cellspacing="0" class="tablet-button" st-button="edit">
                                                                    <tbody>
                                                                       <tr>
                                                                          <td width="auto" align="center" valign="middle" height="30" style=" background-color:#0db9ea; border-top-left-radius:4px; border-bottom-left-radius:4px;border-top-right-radius:4px; border-bottom-right-radius:4px; background-clip: padding-box;font-size:13px; font-family:Helvetica, arial, sans-serif; text-align:center;  color:#ffffff; font-weight: 300; padding-left:18px; padding-right:18px;">
                                                                          
                                                                             <span style="color: #ffffff; font-weight: 300;">
                                                                                <a style="color: #ffffff; text-align:center;text-decoration: none;" href=${link}>Читать дальше</a>
                                                                             </span>
                                                                          </td>
                                                                       </tr>
                                                                    </tbody>
                                                                 </table>
                                      </td>
                                   </tr>
                                   <!-- /button -->
                                   <!-- Spacing -->
                                   <tr>
                                      <td width="100%" height="20"></td>
                                   </tr>
                                   <!-- Spacing -->
                                </tbody>
                             </table>
                          </td>
                       </tr>
                    </tbody>
                 </table>
              </td>
           </tr>
        </tbody>
     </table>
  </div>
  
  <div class="block">
     <!-- start textbox-with-title -->
     <table width="100%" bgcolor="#f6f4f5" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="fulltext">
        <tbody>
           <tr>
              <td>
                 <table bgcolor="#ffffff" width="580" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth" modulebg="edit">
                    <tbody>
                       <!-- Spacing -->
                       <tr>
                          <td width="100%" height="30"></td>
                       </tr>
                   
       
                                                     
                    </tbody>
                 </table>
              </td>
           </tr>
        </tbody>
     </table>
     <!-- End of preheader -->
  </div>
  
  </body></html>`,
},function(err){
        if(err){
            res.status(500).send('неработает отправка писемь, сорян бро');
        };
    });
   res.redirect('/ciberlexa');
}

exports.getFishPage = async (req,res) => {
    const userMain = await isLoggedIn(req);
    let score = 0;
    const link = `http://localhost:3000/friend/${req.params.link}`
    console.log('ссылка по котороый перешли       ' + req.params.link);
    try {
        let user = await UserM.findOne({
            where: {link },
            attributes:['score']
        });
        score = user.score;
        score = +score + 10;
        const updateScore = await UserM.update(
            { score : score },
            { where: { link}});
        console.log(`getFishPage win---> ${updateScore}`);
        res.render('./moks/acceptFishing',{
            userMain
        });
    } catch (err) {
        console.log(`getFishPage lose---> ${err}`);
        res.render('404');
    };
       
};

exports.getPasswordLesson =  async  (req,res) => {
   let userMain = await isLoggedIn(req);
   res.render('./moks/password-lesson',{
      userMain
   });
}

exports.getAcceptFishing = (req, res) => {
    res.render('./moks/acceptFishing');
}

exports.getMenu = async  (req,res) => {
   let userMain = await isLoggedIn(req);
   res.render('./moks/index',{
      userMain
   })
}
//authentication  function
async function isLoggedIn (req) {
    const result = {};
    try {
        let user = await UserM.findOne({
            where: { cookie : req.cookies.seals},
            attributes:['name','avatar','id','email','phone','link','score']
        });
        result.name = user.name;
        result.avatar = user.avatar;
        result.id = user.id;
        result.email = user.email;
        result.link = user.link;
        result.phone = user.phone;
        result.score = user.score;
        result.status = true;
    } catch (error) {
        result.status = false;
    }
    return result;
}; 

exports.returnFish = async (req, res) => {
   const userMain = await isLoggedIn(req);
   console.log(`returnFish link -----> ${req.params.link }`);

   try {
      let user = await UserM.findOne({
          where: {link : `http://localhost:3000/friend/${req.params.link}` },
          attributes:['email']
      });
      console.log(`Return fish get email ----> ${user.email}`);
      transporter.sendMail({
         to: user.email,
         from: 'kiguno1996@gmail.com',
         subject: "Друг Попался!!",
         html: `<html xmlns="http://www.w3.org/1999/xhtml"><head>
         <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Minty-Multipurpose Responsive Email Template</title>
         <style type="text/css">
            /* Client-specific Styles */
            #outlook a {padding:0;} /* Force Outlook to provide a "view in browser" menu link. */
            body{width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0;}
            /* Prevent Webkit and Windows Mobile platforms from changing default font sizes, while not breaking desktop design. */
            .ExternalClass {width:100%;} /* Force Hotmail to display emails at full width */
            .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} /* Force Hotmail to display normal line spacing.  More on that: http://www.emailonacid.com/forum/viewthread/43/ */
            #backgroundTable {margin:0; padding:0; width:100% !important; line-height: 100% !important;}
            img {outline:none; text-decoration:none;border:none; -ms-interpolation-mode: bicubic;}
            a img {border:none;}
            .image_fix {display:block;}
            p {margin: 0px 0px !important;}
            
            table td {border-collapse: collapse;}
            table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; }
            /*a {color: #e95353;text-decoration: none;text-decoration:none!important;}*/
            /*STYLES*/
            table[class=full] { width: 100%; clear: both; }
            
            /*################################################*/
            /*IPAD STYLES*/
            /*################################################*/
            @media only screen and (max-width: 640px) {
            a[href^="tel"], a[href^="sms"] {
            text-decoration: none;
            color: #ffffff; /* or whatever your want */
            pointer-events: none;
            cursor: default;
            }
            .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {
            text-decoration: default;
            color: #ffffff !important;
            pointer-events: auto;
            cursor: default;
            }
            table[class=devicewidth] {width: 440px!important;text-align:center!important;}
            table[class=devicewidthinner] {width: 420px!important;text-align:center!important;}
            table[class="sthide"]{display: none!important;}
            img[class="bigimage"]{width: 420px!important;height:219px!important;}
            img[class="col2img"]{width: 420px!important;height:258px!important;}
            img[class="image-banner"]{width: 440px!important;height:106px!important;}
            td[class="menu"]{text-align:center !important; padding: 0 0 10px 0 !important;}
            td[class="logo"]{padding:10px 0 5px 0!important;margin: 0 auto !important;}
            img[class="logo"]{padding:0!important;margin: 0 auto !important;}
   
            }
            /*##############################################*/
            /*IPHONE STYLES*/
            /*##############################################*/
            @media only screen and (max-width: 480px) {
            a[href^="tel"], a[href^="sms"] {
            text-decoration: none;
            color: #ffffff; /* or whatever your want */
            pointer-events: none;
            cursor: default;
            }
            .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {
            text-decoration: default;
            color: #ffffff !important; 
            pointer-events: auto;
            cursor: default;
            }
            table[class=devicewidth] {width: 280px!important;text-align:center!important;}
            table[class=devicewidthinner] {width: 260px!important;text-align:center!important;}
            table[class="sthide"]{display: none!important;}
            img[class="bigimage"]{width: 260px!important;height:136px!important;}
            img[class="col2img"]{width: 260px!important;height:160px!important;}
            img[class="image-banner"]{width: 280px!important;height:68px!important;}
            
            }
         </style>
   
         
      </head>
   <body>
   <div class="block">
      <!-- Start of preheader -->
      <table width="100%" bgcolor="#f6f4f5" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="preheader">
         <tbody>
            <tr>
               <td width="100%">
                  <table width="580" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                   
                  </table>
               </td>
            </tr>
         </tbody>
      </table>
      <!-- End of preheader -->
   </div>
   <div class="block">
      <!-- start of header -->
      <table width="100%" bgcolor="#f6f4f5" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="header">
         <tbody>
            <tr>
               <td>
                  <table width="580" bgcolor="#0db9ea" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth" hlitebg="edit" shadow="edit">
                     <tbody>
     
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
         </tbody>
      </table>
      <!-- end of header -->
   </div><div class="block">
      <!-- image + text -->
      <table width="100%" bgcolor="#f6f4f5" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="bigimage">
         <tbody>
            <tr>
               <td>
                  <table bgcolor="#ffffff" width="580" align="center" cellspacing="0" cellpadding="0" border="0" class="devicewidth" modulebg="edit">
                     <tbody>
                        <tr>
                           <td width="100%" height="20"></td>
                        </tr>
                        <tr>
                           <td>
                              <table width="540" align="center" cellspacing="0" cellpadding="0" border="0" class="devicewidthinner">
                                 <tbody>
                                    <tr>
                                       <!-- start of image -->
                                       <td align="center">
 
                                          <a href="https://imgbb.com/"><img src="https://i.ibb.co/47JC6JS/len1.png" alt="len1"  width="340" border="0" height="282" alt="" style="display:block; border:none; outline:none; text-decoration:none;></a>
                                       </td>
                                    </tr>
                                    <!-- end of image -->
                                    <!-- Spacing -->
                                    <tr>
                                       <td width="100%" height="20"></td>
                                    </tr>
                                    <!-- Spacing -->
                                    <!-- title -->
                                    <tr>
                                       <td style="font-family: Helvetica, arial, sans-serif; font-size: 18px; color: #333333; text-align:left;line-height: 20px;" st-title="rightimage-title">
                                          Вы провели успешную фишинг атаку на своем друге
                                       </td>
                                    </tr>
                                    <!-- end of title -->
                                    <!-- Spacing -->
                                    <tr>
                                       <td width="100%" height="20"></td>
                                    </tr>
                                    <!-- Spacing -->
                                    <!-- content -->
                                    <tr>
                                       <td style="font-family: Helvetica, arial, sans-serif; font-size: 13px; color: #95a5a6; text-align:left;line-height: 24px;" st-content="rightimage-paragraph">
                                        Данный которые вам удалось получить >>> 
                                        Рекомендуемые книги: ${req.body.book}.
                                        Имя ${req.body.name} Фамилия ${req.body.surname}
                                       </td>
                                    </tr>
                                    <!-- end of content -->
                                    <!-- Spacing -->
                                    <tr>
                                       <td width="100%" height="10"></td>
                                    </tr>
                                    <!-- button -->
                                    <tr>
                                       <td>
                                          <table height="30" align="left" valign="middle" border="0" cellpadding="0" cellspacing="0" class="tablet-button" st-button="edit">
                                                                     <tbody>
                                                                        <tr>
                                                                           <td width="auto" align="center" valign="middle" height="30" style=" background-color:#0db9ea; border-top-left-radius:4px; border-bottom-left-radius:4px;border-top-right-radius:4px; border-bottom-right-radius:4px; background-clip: padding-box;font-size:13px; font-family:Helvetica, arial, sans-serif; text-align:center;  color:#ffffff; font-weight: 300; padding-left:18px; padding-right:18px;">
                                                                           
                                                                              <span style="color: #ffffff; font-weight: 300;">
                                                                                 <a style="color: #ffffff; text-align:center;text-decoration: none;" href=http://localhost:3000/>Читать дальше</a>
                                                                              </span>
                                                                           </td>
                                                                        </tr>
                                                                     </tbody>
                                                                  </table>
                                       </td>
                                    </tr>
                                    <!-- /button -->
                                    <!-- Spacing -->
                                    <tr>
                                       <td width="100%" height="20"></td>
                                    </tr>
                                    <!-- Spacing -->
                                 </tbody>
                              </table>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
         </tbody>
      </table>
   </div>
   
   <div class="block">
      <!-- start textbox-with-title -->
      <table width="100%" bgcolor="#f6f4f5" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="fulltext">
         <tbody>
            <tr>
               <td>
                  <table bgcolor="#ffffff" width="580" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth" modulebg="edit">
                     <tbody>
                        <!-- Spacing -->
                        <tr>
                           <td width="100%" height="30"></td>
                        </tr>
                    
        
                                                      
                     </tbody>
                  </table>
               </td>
            </tr>
         </tbody>
      </table>
      <!-- End of preheader -->
   </div>
   
   </body></html>`,
 },function(err){
         if(err){
             res.status(500).send('неработает отправка писемь, сорян бро');
         };
     });

  } catch (err) {
      console.log(`ReturnFish lose---> ${err}`);
      res.render('404');
  };
  res.redirect('/');
};