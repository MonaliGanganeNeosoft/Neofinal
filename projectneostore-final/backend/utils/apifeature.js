class ApiFeture {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr
    }
    search(){
        const keyword = this.queryStr.keyword ? {
            product_name:{
                $regex:this.queryStr.keyword,
                $options:"i",
            }
        }:{};
        // console.log(this.query);
        // console.log(this.queryStr)
        this.query = this.query.find({...keyword});
        return this;
    }
    
    filter(){
        const queryCopy = {...this.queryStr}
        //console.log(queryCopy);

        //Remving some fields for category
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach(key=>delete queryCopy[key]);

        
        //filter for price and ratings
        //console.log(queryCopy);
        let queryStr=JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`)
        //console.log(queryStr)

        // let queryStr1=JSON.stringify(queryCopy);
        // queryStr=queryStr.sort((a,b)=>parseFloat(b.product_cost)-parseFloat(a.product_cost));
        // console.log(queryStr)

        this.query=this.query.find(JSON.parse(queryStr));
       //console.log(queryStr);
        return this;

    }
    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
module.exports = ApiFeture