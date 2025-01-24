exports.submitQuery=(request,response)=>{
   const name=request.query.name;
   response.json({data:name});
};
exports.submitPath=(request,response)=>{
    const id=request.params.id;
    response.json({data:id});
 };
 exports.submitBody=(request,response)=>{
    const name=request.body;
    response.json({data:name});
 };
 exports.getName=(request,response)=>{
    response.json({name:'Sanchi Chaurasia'});
 };