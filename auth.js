var db = require('./db');

module.exports = {
    login : (req, res)=>{
        var context = {
            menu : 'menuForCustomer.ejs',
            who : '손님',
            body : 'login.ejs',
            logined : 'NO'
        };
        req.app.render('home', context, (err, html)=>{
            res.end(html); })
    },

    login_process : (req, res)=> {
        var post = req.body;

        db.query('select count(*) as num from person where loginid = ? and password = ?', [post.id, post.pwd],(error, results)=>{
            if(results[0].num === 1){
                db.query('select name, class from person where loginid = ? and password = ?', [post.id, post.pwd],(error, result)=>{
                    req.session.is_logined = true;
                    req.session.name = result[0].name
                    req.session.class = result[0].class
                    res.redirect('/');
                })
            }
            else {
                    req.session.is_logined = false;
                    req.session.name = '손님';
                    req.session.class = '99';
                    res.redirect('/');
            }
        })
    },

    register : (req, res) => {
        var context = {
            menu: 'menuForCustomer.ejs',
            who: '손님',
            body: 'register.ejs',
            logined: 'NO'
        };
        req.app.render('home', context, (err, html) => {
            res.end(html);
        });
    },

    register_process : (req, res) => {
        var post = req.body;
        
        db.query('INSERT INTO person (loginid, password, name, address, tel, birth, class, point) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [post.id, post.password, post.name, post.address, post.tel, post.birth, post.class, post.point], (error, results) => {
                if (error) {
                    console.error(error);
                } else {
                    res.redirect('/auth/login');
                }
            }
        );
    },

    logout_process : (req, res) => {
        req.session.destroy((err) =>{
            res.redirect('/');
        })
    }

}
