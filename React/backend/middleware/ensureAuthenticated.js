export async function ensureAuthenticated(res, req, next) {
    if (req.isAuthenticated()) {
        return next()
    } 
    res.redirect(process.env.CLIENT_BASE_URL + "/login");
}