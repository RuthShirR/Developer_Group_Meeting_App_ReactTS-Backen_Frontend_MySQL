// =================================
// MEETING MODEL
// =================================

class Meeting{

    public meeting_code:number;
    public d_group_code:number;
    public start_meeting_date_time:string;
    public end_meeting_date_time:string;
    public meeting_description:string;
    public meeting_room:string;
     
    constructor(
        meeting_code:number,
       d_group_code:number,
       start_meeting_date_time:string,
       end_meeting_date_time:string,
       meeting_description:string,
       meeting_room:string,
    ){
       this.meeting_code=meeting_code;
       this.d_group_code=d_group_code;
       this.start_meeting_date_time= start_meeting_date_time;
       this.end_meeting_date_time=end_meeting_date_time;
       this.meeting_description=meeting_description;
       this.meeting_room=meeting_room;
    }
    static filter(arg0: (meeting: any) => boolean) {
      throw new Error('Method not implemented.');
    }
}

export default Meeting;