const joiErrorFormatter= theErrors=>{
    const errors={}
    
    const details=theErrors.details

    details.map(d=>{        
       errors[d.path]= [d.message]        
    })
    return errors
}
const mongooseErrorFormatter= theErrors=>{
    const errors={}
    
    const details=theErrors.errors

    for (const key in details){
        errors[key] =[details[key].message]
    }
    return errors
}


module.exports= {joiErrorFormatter, mongooseErrorFormatter}