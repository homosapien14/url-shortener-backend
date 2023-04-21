const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const URL = require('../model/url.model');


const createShortUrl = async(req,res)=>{

    const {longURL} =req.body;

    const baseUrl = config.get('baseUrl');

    //check base url
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json("Invalid base URL");
    }

    // create url code
    const urlCode = shortid.generate();

    //check long url
    if(validUrl.isUri(longURL)){
        try{
            let url = await URL.findOne({longUrl:longURL});
            if(url){
                res.json(url);
            }else{
                const shortUrl = baseUrl+'/'+urlCode;
                url = new URL({
                    longUrl:longURL,
                    shortUrl:shortUrl,
                    urlCode:urlCode,
                    date:new Date()
                });
                await url.save();
                res.json(url);
            }
        } catch(e) {
            console.error(e);
            res.status(500).json('server error');
        }
    } else{
        res.status(401).json('invalid long url');
    }
}

const getLongUrl =async (req, res) => {

    try {
        console.log("HIiiii");
        const code = req.params.code;
        const url = await URL.findOne({urlCode:code});
       
        console.log(url);
        if(url){
            return res.redirect(url.longUrl);
        }
        else{
            return res.status(404).json('No URL found');
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server error');
    }
};

module.exports = {createShortUrl,getLongUrl};