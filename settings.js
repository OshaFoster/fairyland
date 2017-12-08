console.log(process.env.MONGODB_URI);

module.exports = {
    port: process.env.PORT || 8000,
    db: process.env.MONGODB_URI || "mongodb://localhost:27017/cupcake",
    secret: process.env.SECRET
}
