const Agenda = require('agenda');
const mongoose = require('mongoose');
// const Newsletter = ;
const sendMail = require('./sendMail');

const agenda = new Agenda({ db: {address: process.env.MONGO_URI, collection: "agendaJobs"}});



agenda.define("send newsletter", async function(job, done){
    User.find({role:"admin"},async function (err, users) {
        if (err) {
          return done(err);
        }
        if (users.length === 0) {
          return done();
        }
        
        let domain;
        if (process.env.NODE_ENV === "production") {
            domain = "https://zairza.in"
        } else {
            domain = "http://localhost:3000"
        }

        let errorMessage = "";
        let affectedUsers = [];
    
        for (let i = 0; i < users.length; i++){
          if (users[i].name === undefined) {
            users[i].name = "";
          }
          const err = await sendMail(
            {
              email: users[i].email,
              templateId:process.env.TEMPLATE_ID,
              dynamic_template_data: {
                name: users[i].name.split(" ")[0],
                unsubscribeLink: `${domain}/unsubscribe#${users[i]._id}`,
              },
            }
          );
            
          if(err){
            console.log(err,err.response.body.errors[0].message);
            errorMessage = err.response.body.errors[0].message;
            affectedUsers.push(users[i]._id);
          }
        }

        mongoose.model('newsletters').findByIdAndUpdate(job.attrs.data.newsletterId, { 
            sent: users.length - affectedUsers.length,
            notSent: affectedUsers.length,
            message: errorMessage,
            affectedUsers
        },{new:true},function(err, n){
            if(err){
                console.log(err);
            }
        });
      });
});







agenda.on("start", (job)=>{
    console.log(`<${job.attrs.name}> started on ${Date()}`);
});

agenda.on("complete", (job)=>{
    console.log(`<${job.attrs.name}> completed on ${Date()}`);
});


(async function () {
    await agenda.start();
})();

module.exports = agenda;

