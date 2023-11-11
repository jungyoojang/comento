var db = require('./db');

function authIsOwner(req, res) {
    if(req.session.is_logined)
    {
        return true;
    }
    else {
        return false; }
}

module.exports = {
    home : (req, res)=>{
        db.query('SELECT * FROM merchandise', (error, merchandise)=> {
            db.query('SELECT * FROM boardtype', (error, boardtype)=> {
            if(error) {
                console.error(error);
            }
            var isOwner = authIsOwner(req, res);

            if (isOwner){
                if(req.session.class === '01'){
                    var context = {
                        menu : 'menuForManager.ejs',
                        who : req.session.name,
                        body : 'merchandise.ejs',
                        logined : 'YES',
                        merchandise : merchandise,
                        view : 'u',
                        boardtype: boardtype
                    };
                }
                else if(req.session.class === '02'){
                    var context = {
                        menu : 'menuForCustomer.ejs',
                        who : req.session.name,
                        body : 'merchandise.ejs',
                        logined : 'YES',
                        merchandise : merchandise,
                        view : 'v',
                    };
                }
            }
            else 
            {
                var context = {
                    menu : 'menuForCustomer.ejs',
                    who : '손님',
                    body : 'merchandise.ejs',
                    logined : 'NO',
                    merchandise : merchandise,
                    view: 'v',
                };
            }
            req.app.render('home', context, (err, html)=>{
                res.end(html); })
        })
     })
    }
}
