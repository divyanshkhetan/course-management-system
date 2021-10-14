const cmsHomePage = (req, res, next) => {
    res.json({message: "get homepage"});
};

module.exports = {cmsHomePage};