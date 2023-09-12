// =================================
// GROUPS MODEL
// =================================

class Group{
    public d_group_code:number;
    public d_group_name:string;

    constructor( 
        d_group_code:number,
        d_group_name:string){
            this.d_group_code=d_group_code;
            this.d_group_name= d_group_name;
            
         }
     
}

export default Group;