<template>
  <div id="manager">
  <div class="split left centered">
    <div class="logo">Tickets pending for approval</div>
    <div id="pentickets">
    <div v-for="(next , i) in tickets" :key="i">
      <div class="automargin" v-if="!next.approved"><button id="btnid" class="lbutton" v-on:click="getbtnvalue(next._id)">{{next._id}}</button></div>
    </div>
  </div>
  </div>
  

  <div class="splitr right centered">
    <div class="logor">Concession Manager's Dashboard</div>
    <div id="ticketdata">
    <form id="myForm" @submit.prevent="onSubmit">
      <div class="row">
      <div class="col-md-1"></div>
      <div class="form-group col-md-5 bitems"><h5>Ticket Reference Number: {{this.btnvalue}}</h5></div>
      <div class="form-group col-md-5 bitems"><h5>Booking Account Number: {{this.bookingacc}}</h5></div>
      </div>

      <div class="row">
      <div class="col-md-1"></div>
      <div class="form-group col-md-5">
        <label for="exampleFormControlInput1"> Source: </label>
        <input type="text" class="form-control" id="exampleFormControlSelect2_1" placeholder="Select Source" readonly v-model="source">
      </div>
      <div class="form-group col-md-5">
        <label for="exampleFormControlInput1"> Destination: </label>
        <input type="text" class="form-control" id="exampleFormControlSelect2_2" placeholder="Select Destination" readonly v-model="destination">
      </div>
      </div>

      <div class="row">
      <div class="col-md-1"></div>
      <div class="form-group col-md-6">
        <label for="name">Name of Passenger: </label>
        <input type="text" class="form-control" id="name" placeholder="Name" pattern="[a-zA-Z ]{2,30}" title="Letters Only." readonly v-model="pname">
      </div>
      <div class="form-group col-md-4">
        <label for="myDate">Journey Date: </label>
        <input type="text" class="form-control" id="myDate" name="trip-start" readonly v-model="Jdate">
      </div>
      </div>

      <div class="row">
      <div class="col-md-1"></div>
      <div class="form-group col-md-4">
        <label for="dob">Date of Birth: </label>
        <input type="text" class="form-control" id="dob" name="trip-start" readonly v-model="dob">
      </div>
      <div class="form-group col-md-2">
        <label for="age">Age:</label>
        <input type="text" class="form-control" id="age" name="age" placeholder="Age" readonly v-model="age">
      </div>
      <div class="form-group radio col-md-4">
        <label for="exampleFormControlInput1">Gender: </label>
        <input type="text" class="form-control" id="gender" name="gender" placeholder="Gender" readonly v-model="gender">
      </div>
      </div>

      <div class="row">
      <div class="col-md-1"></div>
      <div class="form-group col-md-5" id="class_selection">
        <label for="exampleFormControlInput1">Journey Class: </label>
        <input type="text" class="form-control" id="jclass" name="jclass" placeholder="Journey Class" readonly v-model="Jclass">
      </div>
      <div class="form-group col-md-5">
        <label for="exampleFormControlInput1">Ticket Fare: </label>
        (₹)<input type="text" class="form-control"  name="price" id="Price" readonly="readonly" v-model="fare">
      </div>
      </div>

      <div class="row">
        <div class="col-md-1"></div>
        <div class="bitems col-md-5">Concessions Claimed:</div>
      </div>
      <div class="row" v-for="(A, index) in concessiontype" :key="index">
        <div class="col-md-1"></div>
        <div class="col-md-5" v-if="concessionvalue[index]">
          <h5>{{A}}-{{concessionvalue[index]}}</h5>
        </div>
        <div class="col-md-5" style="text-align: left">
          <button type="button" class="btn btn-danger btn-md" v-on:click="ticketedit(index)">DELETE</button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-1"></div>
        <div class="form-group col-md-5">
          <label for="exampleFormControlInput1">Total Discount: </label>
          (%)<input type="text" class="form-control"  name="discount" id="Total" readonly="readonly" v-model="totdisc">
        </div>
        <div class="form-group col-md-5">
          <label for="exampleFormControlInput1">Final Ticket Fare: </label>
          (₹)<input type="text" class="form-control"  name="finalprice" id="Final" readonly="readonly" v-model="final">
        </div>
      </div>


      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-5">
          <button type="submit" class="btn btn-primary btn-lg" id="bt1" :disabled="!this.btnvalue && !this.bookingacc">Approve</button>
        </div>
        <div class="col-md-5">
          <button type="button" class="btn btn-primary btn-lg" id="bt2">Print</button>
        </div>
      </div>

    </form>
    </div>
  </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return{
      tickets: [],
      btnvalue: null,
      ticket: null,
      source: null,
      destination: null,
      pname: null,
      Jdate: null,
      dob:null,
      age: null,
      gender: null,
      Jclass: null,
      bookingacc: null,
      concessiontype: [],
      concessionvalue: [],
      fconcessiontype: [],
      fconcessionvalue: [],
      temp: [],
      max: null,
      smax: null,
      disc: 0,
      totdisc: 0,
      final: 1000,
      fare: 1000,

      mndisable: [],
      mnpatient: [],
      mnsenior: [],
      mnawardee: [],
      mnwarwidow: [],
      mnstudents: [],
      mnyouths: [],
      mnkisans:[],
      mnartist: [],
      mnmedical: [],
      mnothers: [],
      mntotal: [],
      mntotdisc: [],
      mndiscvalue: 0,
      contname: [],
      contvalue: [],
    }
  },
  created () {
      this.getallinfo();
  },
  methods:{
    getallinfo(){
      if(this.$store.getters.isAuthenticated){
        const AuthStr = 'Bearer '.concat(this.$store.getters.isToken)
        axios.get('/ticketinfo/',{ headers: { 'Authorization': AuthStr }})
        .then(res => {
          console.log(res)
          this.tickets = res.data
          console.log(this.tickets)
        })
        .catch(err => console.log(err))
      }
    },
    getbtnvalue(x){
      this.btnvalue = x;
      console.log(this.btnvalue);
      if(this.$store.getters.isAuthenticated){
      const AuthStr = 'Bearer '.concat(this.$store.getters.isToken)
      axios.get('/ticketinfo/'.concat(this.btnvalue),{ headers: { 'Authorization': AuthStr }})
      .then(res => {
        console.log(res)
        this.ticket = res.data
        console.log(this.ticket)
        this.source=this.ticket.source,
        this.destination=this.ticket.destination,
        this.pname=this.ticket.name,
        this.Jdate=this.ticket.Jdate,
        this.dob=this.ticket.dob,
        this.age=this.ticket.age,
        this.gender=this.ticket.gender,
        this.Jclass=this.ticket.Jclass,
        this.bookingacc=null,
        this.concessiontype=[],
        this.concessionvalue=[],
        this.max=null,
        this.smax=null,
        this.totdisc=this.ticket.discount,
        this.final=this.ticket.final,
        this.fare=this.ticket.fare,
        this.concessiontype=this.ticket.concessiontype,
        this.concessionvalue=this.ticket.concessionvalue,
        this.bookingacc=this.ticket.bookingacc._id  
      })
      .catch(err => console.log(err))
    }
    },


//////////////////////////////////////////////////////////////////////////////////////////////////

    mntotalvalue(b){
    //Discount percentage based on number of concessions selected
      this.mndiscvalue=0;
      if(b.length==1){
        this.mndiscvalue=b.reduce((a, b) => (+a) + (+b), 0);
      }
      else if(b.length==2){
        this.findmax(b);
        this.mndiscvalue= +this.max + +(this.smax)*5/100;
      }
      else if(b.length==3){
        this.findmax(b);
        this.mndiscvalue= +this.max + +(this.smax)*7/100;
      }
      else if(b.length > 3){
        this.findmax(b);
        this.mndiscvalue= +this.max + +(this.smax)*10/100;
      }
      if(this.mndiscvalue!=0)
      this.mntotdisc.push(this.mndiscvalue);
      
    },

    findmax(v){
      this.temp = v;
      if(this.temp[0]<this.temp[1]){ 
          this.max = this.temp[1];
          this.smax = this.temp[0];
      }
      else{ 
          this.max = this.temp[0];
          this.smax = this.temp[1];
      }
      for (let i = 2; i < this.temp.length ; i++) 
        {     
            if (+(this.temp[i]) > +(this.max)) 
            {   
                this.smax = this.max; 
                this.max = this.temp[i];
            } 
            else if(+(this.temp[i]) > +(this.smax)) // && +(this.temp[i]) != +(this.max)
            { 
            this.smax = this.temp[i];
            } 
        }
      this.temp=[];
    },

    total(){
    this.contvalue = this.concessionvalue;
    this.contname = this.concessiontype;
    this.mndisable = [];
    this.mnpatient = [];
    this.mnsenior = [];
    this.mnawardee = [];
    this.mnwarwidow = [];
    this.mnstudents = [];
    this.mnyouths = [];
    this.mnkisans = [];
    this.mnartist = [];
    this.mnmedical = [];
    this.mnothers = [];
    for(let mnc=0;mnc<this.contname.length;mnc++){
      if(this.contname[mnc]=='Orthopaedically Handicapped' || this.contname[mnc]== 'Mentally Retarded' || this.contname[mnc]== 'Blind Person' || this.contname[mnc]== 'Deaf and Dumb'){
        this.mndisable.push(this.contvalue[mnc]);
      }
      else if(this.contname[mnc]=='Cancer Patient' || this.contname[mnc]== 'Thalasssemia Patient' || this.contname[mnc]== 'Heart Patient' || this.contname[mnc]== 'Kidney Patient' || this.contname[mnc]=='Haemophillia Patient' || this.contname[mnc]== 'T.B/Lupas Valgaris Patient' || this.contname[mnc]== 'Leprosy Patient' || this.contname[mnc]== 'AIDS Patient' || this.contname[mnc]=='Ostomy Patient' || this.contname[mnc]== 'Aplastic Anaemia Patient' || this.contname[mnc]== 'Sickle Cell Anaemia Patient'){
        this.mnpatient.push(this.contvalue[mnc]);
      }
      else if(this.contname[mnc]=='Men-60 years and above' || this.contname[mnc]== 'Women-58 years and above'){
        this.mnsenior.push(this.contvalue[mnc]);
      }
      else if(this.contname[mnc]=='Recipients of Police Medal-Men-60 years and above' || this.contname[mnc]== 'Recipients of Police Medal-Women-60 years and above' || this.contname[mnc]== 'Shram Awardee' || this.contname[mnc]== 'National Teacher Awardee' || this.contname[mnc]== 'National Bravery Awardee'){
        this.mnawardee.push(this.contvalue[mnc]);
      }
      else if(this.contname[mnc]=='War Widow' || this.contname[mnc]== 'Widows of Policemen and Paramilitary' || this.contname[mnc]== 'Widows of I.P.K.F' || this.contname[mnc]== 'Widows of Defence' || this.contname[mnc]== 'Widows of Martyr Operation Vijay in Kargil'){
        this.mnwarwidow.push(this.contvalue[mnc]);
      }
      else if(this.contname[mnc]=='General Category' || this.contname[mnc]== 'SC/ST Category' || this.contname[mnc]== 'Girls upto Graduation & Boys upto 12th standard between home & school' || this.contname[mnc]== 'Students of Govt. schools-for study tour' || this.contname[mnc]== 'Entrance exam-Girls of Govt. schools' || this.contname[mnc]== 'Students appearing for UPSC' || this.contname[mnc]== 'Foreign Student Studying in India' || this.contname[mnc]== 'Research Scholars upto age of 35' || this.contname[mnc]== 'Participating in Work Campus' || this.contname[mnc]== 'Cadets and Marine Engineers'){
        this.mnstudents.push(this.contvalue[mnc]);
      }
      else if(this.contname[mnc]=='Attending Camps of National Youth Project' || this.contname[mnc]== 'Attending Camps of Manav Uththan Sewa Samiti' || this.contname[mnc]== 'Unemployed youths-To attend interview for job in Public Sector Organisations' || this.contname[mnc]== 'Unemployed youths-To attend interviews for jobs in Central & State Govt' || this.contname[mnc]== 'Bharat Scouts & Guides'){
        this.mnyouths.push(this.contvalue[mnc]);
      }
      else if(this.contname[mnc]=='Kisans and Industrial Labour' || this.contname[mnc]== 'Government Sponsored Special Trains' || this.contname[mnc]== 'Kisans and Milk Producers' || this.contname[mnc]== 'Delegates for Annual Conferences'){
        this.mnkisans.push(this.contvalue[mnc]);
      }
      else if(this.contname[mnc]=='Artists-for performance' || this.contname[mnc]== 'Film Technicians' || this.contname[mnc]== 'Sportsmen Participating in All India & State Tournaments' || this.contname[mnc]== 'Sportsmen Participating in National Tournaments' || this.contname[mnc]== 'Mountaineering Expeditions organised by IMF' || this.contname[mnc]== 'Press Correspondents accredited for press work' || this.contname[mnc]== 'Spouse/companion/dependent children'){
        this.mnartist.push(this.contvalue[mnc]);
      }
      else if(this.contname[mnc]=='Doctors Allopathic' || this.contname[mnc]== 'Nurses & Midwives'){
        this.mnmedical.push(this.contvalue[mnc]);
      }
      else if(this.contname[mnc]=='Delegates for attending Annual Conferences' || this.contname[mnc]== 'Bharat Sewa Dal, Bangalore' || this.contname[mnc]== 'Volunteers of Service Civil International' || this.contname[mnc]== 'Teachers of Primary, Secondary and Higher Secondary Schools' || this.contname[mnc]== 'Members of St. John Ambulance Brigade and Relief Welfare Ambulance Corps, Calcutta'){
        this.mnothers.push(this.contvalue[mnc]);
      }
    }                                                                                                                                                                
    this.mntotdisc = [];                                                                                                                                                           
    this.mntotalvalue(this.mndisable);
    this.mntotalvalue(this.mnpatient);
    this.mntotalvalue(this.mnsenior);                                                                                                                                                            
    this.mntotalvalue(this.mnawardee);
    this.mntotalvalue(this.mnwarwidow);
    this.mntotalvalue(this.mnstudents);
    this.mntotalvalue(this.mnyouths);
    this.mntotalvalue(this.mnkisans);
    this.mntotalvalue(this.mnartist);
    this.mntotalvalue(this.mnmedical);
    this.mntotalvalue(this.mnothers);



    //Discount percentage based on number of concessions selected
    if(this.mntotdisc.length==1){
      this.disc=this.mntotdisc.reduce((a, b) => (+a) + (+b), 0);
    }
    else if(this.mntotdisc.length==2){
      this.findmax(this.mntotdisc);
      this.disc= +this.max + +(this.smax)*5/100;
    }
    else if(this.mntotdisc.length==3){
      this.findmax(this.mntotdisc);
      this.disc= +this.max + +(this.smax)*7/100;
    }
    else if(this.mntotdisc.length > 3){
      this.findmax(this.mntotdisc);
      this.disc= +this.max + +(this.smax)*10/100;
    }

    if(this.contvalue.includes("100") && this.contvalue.length >= 1){
      alert("Discount cannot exceed 100%");
      this.disc = 100;
    }

    this.totdisc = this.disc;
    document.getElementById('Total').value = this.totdisc;
    this.final = document.getElementById('Price').value - document.getElementById('Price').value*this.totdisc/100;
    document.getElementById('Final').value = this.final;
  }, 


//////////////////////////////////////////////////////////////////////////////////////////////////////


    ticketedit(w){
      this.concessiontype[w]=null;
      this.concessionvalue[w]=null;
      this.fconcessiontype=[];
      this.fconcessionvalue=[];
      for(let z=0;z<this.concessiontype.length;z++){
        if(this.concessiontype[z]!=null){
          this.fconcessiontype.push(this.concessiontype[z]);
          this.fconcessionvalue.push(this.concessionvalue[z]);
        }
      }
      this.concessiontype=this.fconcessiontype,
      this.concessionvalue=this.fconcessionvalue,
      this.max=null,
      this.smax=null,
      this.disc=0,
      this.totdisc=0,
      this.final=1000,
      this.fare=1000,
      this.total()
    },
    onSubmit(){
      const formData = {
        discount: this.totdisc,
        final: this.final,
        approved: true,
        concessiontype: this.concessiontype,
        concessionvalue: this.concessionvalue,
      }
      console.log(formData)
      if(this.$store.getters.isAuthenticated){
      const AuthStr = 'Bearer '.concat(this.$store.getters.isToken)
      axios.put('/ticketinfo/'.concat(this.btnvalue),(formData),
        { headers: { "Authorization": AuthStr, "Content-Type": "application/json" } } )
      .then(res => {
        console.log(res)
        console.log(res.data)
        alert("Ticket Reference Number "+this.btnvalue+" Approved.");
        this.btnvalue=null,
        this.bookingacc=null,
        this.concessiontype=[],
        this.concessionvalue=[],
        this.getallinfo();
      })
      .catch(err => {
      console.log(err)
      })
      }
    }
  }
}
</script>

<style scoped>
  body {
    font-family: Arial;
    color: white;
  }

  .split {
    height: 100%;
    width: 20%;
    position: fixed;
    z-index: 1;
    overflow-x: hidden;
  }

    .splitr {
    height: 100%;
    width: 80%;
    position: fixed;
    /* z-index: 1; */
    overflow-x: hidden;
  }

  .left {
    left: 0;
    background-color: aliceblue;
  }

  .right {
    right: 0;
    background-color: aliceblue;
  }

  .centered {
    /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    text-align: center;
  }
  .lbutton{
    color: whitesmoke;
  }

  .lbutton:hover{
    color:#fd7e14;
  }

  .automargin{
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    padding-top: 20px;
    padding-bottom:20px;
    /* border: 1px solid #4CAF50; */
    background-color: #521751;
    /* box-sizing: border-box; */
  }
  .logo{
    color:red;
    font-weight: bold;
    font-size: 20px;
  }
  .logor{
    color:red;
    /* font-weight: bold; */
    font-size: 50px;
  }
  #ticketdata{
    margin-bottom: 50px;
  }
  #pentickets{
    margin-bottom: 60px;
  }
  label{
    text-align: center;
    font-size: 130%;
    font-weight: bolder;
  }
  input{
    text-align: center;
    font-size: 130%;
    font-weight: bold;
  }
  .bitems{
    font-size: 150%;
    font-weight: bolder;
    color: #3827d4;
  }

  h1, p {
    text-align: center;
  }
  p {
    color: red;
  }
</style>