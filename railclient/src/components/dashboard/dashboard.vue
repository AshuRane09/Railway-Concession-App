<template>
  <div id="user">
    <div class="split left centered">
      <div class="logo">BOOK YOUR TICKET</div>

      <div id="pentickets">
        <div class="automarginb">
          <button id="btnid" class="lbuttonb" v-on:click="display = true">
            BOOK TICKET
          </button>
        </div>
        <div class="logo">Your Approved Tickets</div>
        <div id="pentickets">
          <div v-for="(next, i) in ticketsd" :key="i">
            <div class="automargin" v-if="next.approved">
              <button
                id="btnid"
                class="lbutton"
                v-on:click="getbtnvalued(next._id), (display = false)"
              >
                {{ next._id }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="splitr right centered">
      <div class="logor">Concession Management Subsystem</div>

      <!-- to book a ticket  -->
      <div class="ticketinfo-form" v-if="display" style="margin-bottom:7%">
        <form class="userform" @submit.prevent="onSubmit">
          <div class="row">
            <div class="col-md-1"></div>
            <div class="form-group col-md-5">
              <label for="exampleFormControlInput1"> Source: </label>
              <select
                class="form-control"
                id="exampleFormControlSelect2_1"
                @change="sameselect()"
                v-model="selectsource"
              >
                <option>Select Source</option>
                <option v-for="(next, i) in source" :key="i">{{ next }}</option>
              </select>
            </div>

            <div class="form-group col-md-5">
              <label for="exampleFormControlInput1"> Destination: </label>
              <select
                class="form-control"
                id="exampleFormControlSelect2_2"
                v-model="selectdest"
              >
                <option>Select Destination</option>
                <option v-for="(next, i) in source" :key="i">{{ next }}</option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-1"></div>
            <div class="form-group col-md-7">
              <label for="name">Name of Passenger: </label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Name"
                pattern="[a-zA-Z ]{2,30}"
                title="Letters Only."
                v-model="pname"
              />
            </div>
            <div class="form-group col-md-3">
              <label for="start">Journey Date: </label>
              <br />
              <input
                type="date"
                class="form-control"
                id="myDate"
                name="trip-start"
                v-model="Jdate"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-1"></div>
            <div class="form-group col-md-3">
              <label for="start">Date of Birth: </label>
              <input
                type="date"
                class="form-control"
                id="dob"
                name="trip-start"
                @change="agecalc()"
                required
                v-model="dob"
              />
            </div>
            <div class="form-group col-md-2">
              <label for="age">Age:</label>
              <input
                type="text"
                class="form-control"
                id="age"
                name="age"
                placeholder="Age"
                readonly
                value="0"
                v-model="age"
              />
            </div>
            <div class="form-group radio col-md-3">
              <label for="exampleFormControlInput1">Gender: </label>
              <br />
              <div
                class="form-check form-check-inline"
                v-for="(next, i) in gender"
                :key="i"
              >
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  :id="next.id"
                  :value="next.value"
                  v-model="genderopt"
                  @change="invalid()"
                />
                <label class="form-check-label" :for="next.id"
                  >{{ next.text }}
                </label>
              </div>
            </div>
            <div class="form-group col-md-2">
              <label for="exampleFormControlInput1">Ticket Fare:(₹)</label>
              <br />
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input form-control"
                  style="width: 100px"
                  type="text"
                  name="price"
                  id="Price"
                  @change="total()"
                  v-model="fare"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-1"></div>
            <div class="form-group col-md-10" id="class_selection">
              <label for="exampleFormControlInput1">Journey Class: </label>
              <br />
              <div
                class="form-check form-check-inline"
                v-for="(next, i) in classt"
                :key="i"
              >
                <input
                  class="form-check-input seatclass"
                  type="checkbox"
                  :id="next.id"
                  :value="next.value"
                  v-model="classtype"
                  @change="check()"
                />
                <label class="form-check-label" :for="next.id">{{
                  next.text
                }}</label>
              </div>
            </div>
          </div>

          <div class="row" v-if="classtype.length >= 1">
            <div class="col-md-1"></div>
            <div class="form-group col-md-10" id="class_sleeper">
              <label for="exampleFormControlInput1"
                >Concession Category:
              </label>
              <br />
              <div
                class="form-check form-check-inline"
                v-for="(next, i) in concession"
                :key="i"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="next.id"
                  :value="next.value"
                  :name="next.value"
                  :disabled="next.bool"
                  v-model="checkedconcession"
                  @change="selacheck()"
                />
                <label class="form-check-label" :for="next.id">{{
                  next.text
                }}</label>
              </div>
            </div>
          </div>

          <!-- {{ mndisable }}
          {{ mnpatient }}
          {{ mnsenior }}
          {{ mnawardee }}
          {{ mnstudents }}
          {{ mnyouths }}
          {{ mnwarwidow }}
          {{ mnkisans }}
          {{ mnartist }}
          {{ mnmedical }}
          {{ mnothers }} -->

          <div class="asdfgh">
            <div
              style="font-size:130%;font-weight:bolder"
              v-if="this.checkedconcession.length >= 1"
            >
              Concession Type:
            </div>
            <div style="margin-left:15%" class="row">
              <div
                id="test1"
                class="form-group col-md-10 DisabledPassenger"
                v-if="checkedconcession.includes('disable')"
              >
                <label for="exampleFormControlInput1"
                  >Disabled Passengers:
                </label>
                <br />
                <div
                  class="form-check form-check-inline"
                  v-for="(next, i) in disable"
                  :key="i"
                >
                  <div v-if="next.value != 0">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :name="next.value"
                      :id="next.id"
                      :value="next.text"
                      v-model="contname"
                      @change="contcheck()"
                    />
                    <label class="form-check-label" :for="next.id"
                      >{{ next.text }} : {{ next.value }}%</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <div style="margin-left:15%" class="row">
              <div
                id="test2"
                class="form-group col-md-10 Patient"
                v-if="checkedconcession.includes('patient')"
              >
                <label for="exampleFormControlInput1">Patients: </label>
                <br />
                <div
                  class="form-check form-check-inline"
                  v-for="(next, i) in patient"
                  :key="i"
                >
                  <div v-if="next.value != 0">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :name="next.value"
                      :id="next.id"
                      :value="next.text"
                      v-model="contname"
                      @change="contcheck()"
                    />
                    <label class="form-check-label" :for="next.id"
                      >{{ next.text }} : {{ next.value }}%</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <div style="margin-left:15%" class="row">
              <div
                id="test3"
                class="form-group col-md-10 SeniorCitizen"
                v-if="checkedconcession.includes('senior')"
              >
                <label for="exampleFormControlInput1">Senior Citizens: </label>
                <br />
                <div
                  class="form-check form-check-inline"
                  v-for="(next, i) in senior"
                  :key="i"
                >
                  <div v-if="next.value != 0">
                    <input
                      class="form-check-input seniorclass"
                      type="checkbox"
                      :name="next.value"
                      :id="next.id"
                      :value="next.text"
                      :disabled="next.bool"
                      v-model="contname"
                      @change="contcheck()"
                      @click="poiuyt('seniorclass')"
                    />
                    <label class="form-check-label" :for="next.id"
                      >{{ next.text }} : {{ next.value }}%</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <div style="margin-left:15%" class="row">
              <div
                id="test4"
                class="form-group col-md-10 Awardee"
                v-if="checkedconcession.includes('awardee')"
              >
                <label for="exampleFormControlInput1">Awardees: </label>
                <br />
                <div
                  class="form-check form-check-inline"
                  v-for="(next, i) in awardee"
                  :key="i"
                >
                  <div v-if="next.value != 0">
                    <input
                      class="form-check-input awardclass"
                      type="checkbox"
                      :name="next.value"
                      :id="next.id"
                      :value="next.text"
                      :disabled="next.bool"
                      v-model="contname"
                      @change="contcheck()"
                      @click="poiuyt('awardclass')"
                    />
                    <label class="form-check-label" :for="next.id"
                      >{{ next.text }} : {{ next.value }}%</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <div style="margin-left:15%" class="row">
              <div
                id="test5"
                class="form-group col-md-10 WarWidow"
                v-if="checkedconcession.includes('widow')"
              >
                <label for="exampleFormControlInput1">War Widows: </label>
                <br />
                <div
                  class="form-check form-check-inline"
                  v-for="(next, i) in warwidow"
                  :key="i"
                >
                  <div v-if="next.value != 0">
                    <input
                      class="form-check-input widowclass"
                      type="checkbox"
                      :name="next.value"
                      :id="next.id"
                      :value="next.text"
                      v-model="contname"
                      @change="contcheck()"
                      @click="poiuyt('widowclass')"
                    />
                    <label class="form-check-label" :for="next.id"
                      >{{ next.text }} : {{ next.value }}%</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <div style="margin-left:15%" class="row">
              <div
                id="test6"
                class="form-group col-md-10 Students"
                v-if="checkedconcession.includes('students')"
              >
                <label for="exampleFormControlInput1">Students: </label>
                <br />
                <div
                  class="form-check form-check-inline"
                  v-for="(next, i) in students"
                  :key="i"
                >
                  <div v-if="next.value != 0">
                    <input
                      class="form-check-input studentclass"
                      type="checkbox"
                      :name="next.value"
                      :id="next.id"
                      :value="next.text"
                      :disabled="next.bool"
                      v-model="contname"
                      @change="contcheck()"
                      @click="poiuyt('studentclass')"
                    />
                    <label class="form-check-label" :for="next.id"
                      >{{ next.text }} : {{ next.value }}%</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <div style="margin-left:15%" class="row">
              <div
                id="test7"
                class="form-group col-md-10 Youths"
                v-if="checkedconcession.includes('youths')"
              >
                <label for="exampleFormControlInput1 ">Youths: </label>
                <br />
                <div
                  class="form-check form-check-inline"
                  v-for="(next, i) in youths"
                  :key="i"
                >
                  <div v-if="next.value != 0">
                    <input
                      class="form-check-input youthclass"
                      type="checkbox"
                      :name="next.value"
                      :id="next.id"
                      :value="next.text"
                      v-model="contname"
                      @change="contcheck()"
                      @click="poiuyt('youthclass')"
                    />
                    <label class="form-check-label" :for="next.id"
                      >{{ next.text }} : {{ next.value }}%</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <div style="margin-left:15%" class="row">
              <div
                id="test8"
                class="form-group col-md-10 Kisans"
                v-if="checkedconcession.includes('kisans')"
              >
                <label for="exampleFormControlInput1">Kisans: </label>
                <br />
                <div
                  class="form-check form-check-inline"
                  v-for="(next, i) in kisans"
                  :key="i"
                >
                  <div v-if="next.value != 0">
                    <input
                      class="form-check-input kisanclass"
                      type="checkbox"
                      :name="next.value"
                      :id="next.id"
                      :value="next.text"
                      v-model="contname"
                      @change="contcheck()"
                      @click="poiuyt('kisanclass')"
                    />
                    <label class="form-check-label" :for="next.id"
                      >{{ next.text }} : {{ next.value }}%</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <div style="margin-left:15%" class="row">
              <div
                id="test9"
                class="form-group col-md-10 Artists"
                v-if="checkedconcession.includes('artist')"
              >
                <label for="exampleFormControlInput1"
                  >Artists and Sportspersons:
                </label>
                <br />
                <div
                  class="form-check form-check-inline"
                  v-for="(next, i) in artist"
                  :key="i"
                >
                  <div v-if="next.value != 0">
                    <input
                      class="form-check-input artistclass"
                      type="checkbox"
                      :name="next.value"
                      :id="next.id"
                      :value="next.text"
                      v-model="contname"
                      @change="contcheck()"
                      @click="poiuyt('artistclass')"
                    />
                    <label class="form-check-label" :for="next.id"
                      >{{ next.text }} : {{ next.value }}%</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <div style="margin-left:15%" class="row">
              <div
                id="test10"
                class="form-group col-md-10 MedicalProfessionals"
                v-if="checkedconcession.includes('medical')"
              >
                <label for="exampleFormControlInput1"
                  >Medical Professionals:
                </label>
                <br />
                <div
                  class="form-check form-check-inline"
                  v-for="(next, i) in medical"
                  :key="i"
                >
                  <div v-if="next.value != 0">
                    <input
                      class="form-check-input medicalclass"
                      type="checkbox"
                      :name="next.value"
                      :id="next.id"
                      :value="next.text"
                      v-model="contname"
                      @change="contcheck()"
                      @click="poiuyt('medicalclass')"
                    />
                    <label class="form-check-label" :for="next.id"
                      >{{ next.text }} : {{ next.value }}%</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <div style="margin-left:15%" class="row">
              <div
                id="test11"
                class="form-group col-md-10 Others"
                v-if="checkedconcession.includes('others')"
              >
                <label for="exampleFormControlInput1"
                  >Others(Conference, Camps, Tours, etc):
                </label>
                <br />
                <div
                  class="form-check form-check-inline"
                  v-for="(next, i) in others"
                  :key="i"
                >
                  <div v-if="next.value != 0">
                    <input
                      class="form-check-input otherclass"
                      type="checkbox"
                      :name="next.value"
                      :id="next.id"
                      :value="next.text"
                      v-model="contname"
                      @change="contcheck()"
                      @click="poiuyt('otherclass')"
                    />
                    <label class="form-check-label" :for="next.id"
                      >{{ next.text }} : {{ next.value }}%</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-1"></div>
            <div class="bitems col-md-10">
              Concessions Selected: {{ showname.length }}
            </div>
          </div>
          <div class="row" v-for="(A, index) in showname" :key="index">
            <div class="col-md-1"></div>
            <div class="col-md-10" v-if="showvalue[index]">
              <h4>{{ A }}-{{ showvalue[index] }}%</h4>
            </div>
          </div>

          <div class="row">
            <div class="col-md-1"></div>
            <div class="form-group col-md-5">
              <label for="exampleFormControlInput1"
                >Probable Total Discount: (%)</label
              >
              <br />
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input form-control"
                  type="text"
                  name="total"
                  id="Total"
                  value="0"
                  readonly="readonly"
                />
              </div>
            </div>

            <div class="form-group col-md-5">
              <label for="exampleFormControlInput1"
                >Probable Ticket Fare: (₹)</label
              >
              <br />
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input form-control"
                  type="text"
                  name="final"
                  id="Final"
                  value="0"
                  readonly="readonly"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-10">
              <button type="submit" class="btn btn-primary btn-lg" id="btnm">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- To display approved tickets -->

      <div id="ticketdata" v-if="!display">
        <div class="row">
          <div class="col-md-1"></div>
          <div class="form-group col-md-5 bitems">
            <h5>Ticket Reference Number: {{ this.btnvalued }}</h5>
          </div>
          <div class="form-group col-md-5 bitems">
            <h5>Booking Account Number: {{ this.bookingaccd }}</h5>
          </div>
        </div>

        <div class="row">
          <div class="col-md-1"></div>
          <div class="form-group col-md-5">
            <label for="exampleFormControlInput1"> Source: </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlSelect2_1"
              placeholder="Select Source"
              readonly
              v-model="sourced"
            />
          </div>
          <div class="form-group col-md-5">
            <label for="exampleFormControlInput1"> Destination: </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlSelect2_2"
              placeholder="Select Destination"
              readonly
              v-model="destinationd"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-1"></div>
          <div class="form-group col-md-6">
            <label for="name">Name of Passenger: </label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Name"
              pattern="[a-zA-Z ]{2,30}"
              title="Letters Only."
              readonly
              v-model="pnamed"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="myDate">Journey Date: </label>
            <input
              type="text"
              class="form-control"
              id="myDate"
              name="trip-start"
              readonly
              v-model="Jdated"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-1"></div>
          <div class="form-group col-md-4">
            <label for="dob">Date of Birth: </label>
            <input
              type="text"
              class="form-control"
              id="dob"
              name="trip-start"
              readonly
              v-model="dobd"
            />
          </div>
          <div class="form-group col-md-2">
            <label for="age">Age:</label>
            <input
              type="text"
              class="form-control"
              id="age"
              name="age"
              placeholder="Age"
              readonly
              v-model="aged"
            />
          </div>
          <div class="form-group radio col-md-4">
            <label for="exampleFormControlInput1">Gender: </label>
            <input
              type="text"
              class="form-control"
              id="gender"
              name="gender"
              placeholder="Gender"
              readonly
              v-model="genderd"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-1"></div>
          <div class="form-group col-md-5" id="class_selection">
            <label for="exampleFormControlInput1">Journey Class: </label>
            <input
              type="text"
              class="form-control"
              id="jclass"
              name="jclass"
              placeholder="Journey Class"
              readonly
              v-model="Jclassd"
            />
          </div>
          <div class="form-group col-md-5">
            <label for="exampleFormControlInput1">Ticket Fare: </label>
            (₹)<input
              type="text"
              class="form-control"
              name="price"
              id="Price"
              readonly="readonly"
              v-model="fared"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-1"></div>
          <div class="bitems col-md-10">Concessions Approved:</div>
        </div>
        <div class="row" v-for="(A, index) in concessiontyped" :key="index">
          <div class="col-md-1"></div>
          <div class="col-md-10" v-if="concessionvalued[index]">
            <h5>{{ A }}-{{ concessionvalued[index] }}</h5>
          </div>
        </div>

        <div class="row">
          <div class="col-md-1"></div>
          <div class="form-group col-md-5">
            <label for="exampleFormControlInput1">Total Discount: </label>
            (%)<input
              type="text"
              class="form-control"
              name="discount"
              id="Total"
              readonly="readonly"
              v-model="totdiscd"
            />
          </div>
          <div class="form-group col-md-5">
            <label for="exampleFormControlInput1">Final Ticket Fare: </label>
            (₹)<input
              type="text"
              class="form-control"
              name="finalprice"
              id="Final"
              readonly="readonly"
              v-model="finald"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <button type="button" class="btn btn-primary btn-lg" id="bt2">
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var sheetUrl =
  "https://sheets.googleapis.com/v4/spreadsheets/1L88eRVQi9D3Gx6e4Is7PIUFGjwK46OEnJt9Mdtla7R4/values/FormResponses1?key=AIzaSyAmnzSKI-0NpuWg9G6uq3ByTUp41v2dCXU&alt=json";

import axios from "axios";

export default {
  data: () => ({
    checkedconcession: [],
    classtype: [],
    showvalue: [],
    showname: [],
    contvalue: [],
    contname: [],
    contarr: [],
    testing: [],
    zxcvarr: [],
    temp: [],
    arr: [],
    selectsource: "Select Source",
    selectdest: "Select Destination",
    pname: "",
    Jdate: null,
    dob: null,
    age: 0,
    genderopt: "",
    fare: null,
    final: 0,
    entries: null,
    smax: null,
    max: null,
    totdisc: 0,
    disc: 0,
    ticketsd: [],
    btnvalued: null,
    ticketd: null,
    sourced: null,
    destinationd: null,
    pnamed: null,
    Jdated: null,
    dobd: null,
    aged: null,
    genderd: null,
    Jclassd: null,
    bookingaccd: null,
    concessiontyped: [],
    concessionvalued: [],
    totdiscd: 0,
    finald: null,
    fared: null,
    display: true,

    mndisable: [],
    mnpatient: [],
    mnsenior: [],
    mnawardee: [],
    mnwarwidow: [],
    mnstudents: [],
    mnyouths: [],
    mnkisans: [],
    mnartist: [],
    mnmedical: [],
    mnothers: [],
    mntotal: [],
    mntotdisc: [],
    mndiscvalue: 0,

    source: [
      "CST",
      "Panvel Junction",
      "Mumbai Central",
      "Vadodara Junction",
      "Pune Junction",
      "Jodhpur Junction",
      "Howrah Junction",
      "Chennai Central",
      "Agra Fort",
      "Borivali",
      "Bandra Terminus",
      "Dadar",
      "Mysore Junction",
    ],
    gender: [
      {
        text: "Male",
        id: "male",
        value: "male",
      },
      {
        text: "Female",
        id: "female",
        value: "female",
      },
    ],
    classt: [
      {
        text: "Sleeper",
        id: "option1",
        value: "sleeper",
        name: "traintype",
      },
      {
        text: "1st Class",
        id: "option2",
        value: "1stclass",
        name: "traintype",
      },
      {
        text: "2nd Class",
        id: "option3",
        value: "2ndclass",
        name: "traintype",
      },
      {
        text: "AC First",
        id: "option4",
        value: "acfirst",
        name: "traintype",
      },
      {
        text: "AC 2-Tier",
        id: "option5",
        value: "ac2tier",
        name: "traintype",
      },
      {
        text: "AC 3-Tier",
        id: "option6",
        value: "ac3tier",
        name: "traintype",
      },
      {
        text: "AC Chair Car",
        id: "option7",
        value: "acchaircar",
        name: "traintype",
      },
    ],
    concession: [
      {
        id: "inlineCheckbox1",
        value: "disable",
        text: "Disabled Passenger",
      },
      {
        id: "inlineCheckbox2",
        value: "patient",
        text: "Patients",
      },
      {
        id: "inlineCheckbox3",
        value: "senior",
        text: "Senior Citizen",
        bool: false,
      },
      {
        id: "inlineCheckbox4",
        value: "awardee",
        text: "Awardee",
      },
      {
        id: "inlineCheckbox5",
        value: "widow",
        text: "War Widows",
        bool: false,
      },
      {
        id: "inlineCheckbox6",
        value: "students",
        text: "Students",
        bool: false,
      },
      {
        id: "inlineCheckbox7",
        value: "youths",
        text: "Youths",
        bool: false,
      },
      {
        id: "inlineCheckbox8",
        value: "kisans",
        text: "Kisans",
      },
      {
        id: "inlineCheckbox9",
        value: "artist",
        text: "Artists and Sportspersons",
      },
      {
        id: "inlineCheckbox10",
        value: "medical",
        text: "Medical Professionals",
      },
      {
        id: "inlineCheckbox11",
        value: "others",
        text: "Others(Conference, Camps, Tours etc)",
      },
      {
        id: "inlineCheckbox12",
        value: "izzat",
        text: "Izzat MST",
      },
    ],
    payment: [
      {
        id: "inlineRadio1",
        value: "Cash",
      },
      {
        id: "inlineRadio2",
        value: "Card",
      },
      {
        id: "inlineRadio3",
        value: "UPI",
      },
    ],
    disable: [
      {
        id: "handicap",
        name: "OrthopaedicallyHandicapped",
        text: "Orthopaedically Handicapped",
        value: "",
      },
      {
        id: "mental",
        name: "MentallyRetarded",
        text: "Mentally Retarded",
        value: "",
      },
      {
        id: "blind",
        name: "BlindPerson",
        text: "Blind Person",
        value: "",
      },
      {
        id: "deafdumb",
        name: "DeafandDumb",
        text: "Deaf and Dumb",
        value: "",
      },
    ],
    patient: [
      {
        id: "cancer",
        name: "CancerPatient",
        text: "Cancer Patient",
        value: "",
      },
      {
        id: "thala",
        name: "ThalasssemiaPatient",
        text: "Thalasssemia Patient",
        value: "",
      },
      {
        id: "heart",
        name: "HeartPatient",
        text: "Heart Patient",
        value: "",
      },
      {
        id: "kidney",
        name: "KidneyPatient",
        text: "Kidney Patient",
        value: "",
      },
      {
        id: "phillia",
        name: "HaemophilliaPatient",
        text: "Haemophillia Patient",
        value: "",
      },
      {
        id: "lupas",
        name: "T.B/LupasValgarisPatient",
        text: "T.B/Lupas Valgaris Patient",
        value: "",
      },
      {
        id: "leprosy",
        name: "LeprosyPatient",
        text: "Leprosy Patient",
        value: "",
      },
      {
        id: "aids",
        name: "AIDSPatient",
        text: "AIDS Patient",
        value: "",
      },
      {
        id: "ostomy",
        name: "OstomyPatient",
        text: "Ostomy Patient",
        value: "",
      },
      {
        id: "apalstic",
        name: "AplasticAnaemiaPatient",
        text: "Aplastic Anaemia Patient",
        value: "",
      },
      {
        id: "sickle",
        name: "SickleCellAnaemiaPatient",
        text: "Sickle Cell Anaemia Patient",
        value: "",
      },
    ],
    senior: [
      {
        id: "men",
        name: "SeniorCitizen",
        text: "Men-60 years and above",
        value: "",
        bool: false,
      },
      {
        id: "women",
        name: "SeniorCitizen",
        text: "Women-58 years and above",
        value: "",
        bool: false,
      },
    ],
    awardee: [
      {
        id: "medalmen",
        name: "Awards",
        text: "Recipients of Police Medal-Men-60 years and above",
        value: "",
        bool: false,
      },
      {
        id: "medalwomen",
        name: "Awards",
        text: "Recipients of Police Medal-Women-60 years and above",
        value: "",
        bool: false,
      },
      {
        id: "shram",
        name: "Awards",
        text: "Shram Awardee",
        value: "",
        bool: false,
      },
      {
        id: "teacher",
        name: "Awards",
        text: "National Teacher Awardee",
        value: "",
        bool: false,
      },
      {
        id: "bravery",
        name: "Awards",
        text: "National Bravery Awardee",
        value: "",
        bool: false,
      },
    ],
    warwidow: [
      {
        id: "widow",
        name: "WarWidow",
        text: "War Widow",
        value: "",
      },
      {
        id: "widowpolice",
        name: "WarWidow",
        text: "Widows of Policemen and Paramilitary",
        value: "",
      },
      {
        id: "ipkf",
        name: "WarWidow",
        text: "Widows of I.P.K.F",
        value: "",
      },
      {
        id: "wdefence",
        name: "WarWidow",
        text: "Widows of Defence",
        value: "",
      },
      {
        id: "kargil",
        name: "WarWidow",
        text: "Widows of Martyr Operation Vijay in Kargil",
        value: "",
      },
    ],
    students: [
      {
        id: "stgeneral",
        name: "Students",
        text: "General Category",
        value: "",
        bool: false,
      },
      {
        id: "stscst",
        name: "Students",
        text: "SC/ST Category",
        value: "",
        bool: false,
      },
      {
        id: "sttown",
        name: "Students",
        text:
          "Girls upto Graduation & Boys upto 12th standard between home & school",
        value: "",
        bool: false,
      },
      {
        id: "stgovt",
        name: "Students",
        text: "Students of Govt. schools-for study tour",
        value: "",
        bool: false,
      },
      {
        id: "stentrance",
        name: "Students",
        text: "Entrance exam-Girls of Govt. schools",
        value: "",
        bool: false,
      },
      {
        id: "stupsc",
        name: "Students",
        text: "Students appearing for UPSC",
        value: "",
        bool: false,
      },
      {
        id: "stforeign",
        name: "Students",
        text: "Foreign Student Studying in India",
        value: "",
        bool: false,
      },
      {
        id: "stresearch",
        name: "Students",
        text: "Research Scholars upto age of 35",
        value: "",
        bool: false,
      },
      {
        id: "stcampus",
        name: "Students",
        text: "Participating in Work Campus",
        value: "",
        bool: false,
      },
      {
        id: "stcadet",
        name: "Students",
        text: "Cadets and Marine Engineers",
        value: "",
        bool: false,
      },
    ],
    youths: [
      {
        id: "yncamp",
        name: "Youths",
        text: "Attending Camps of National Youth Project",
        value: "",
      },
      {
        id: "ymanav",
        name: "Youths",
        text: "Attending Camps of Manav Uththan Sewa Samiti",
        value: "",
      },
      {
        id: "ypublic",
        name: "Youths",
        text:
          "Unemployed youths-To attend interview for job in Public Sector Organisations",
        value: "",
      },
      {
        id: "ycentral",
        name: "Youths",
        text:
          "Unemployed youths-To attend interviews for jobs in Central & State Govt",
        value: "",
      },
      {
        id: "yscout",
        name: "Youths",
        text: "Bharat Scouts & Guides",
        value: "",
      },
    ],
    kisans: [
      {
        id: "klabour",
        name: "Kisans",
        text: "Kisans and Industrial Labour",
        value: "",
      },
      {
        id: "kgovt",
        name: "Kisans",
        text: "Government Sponsored Special Trains",
        value: "",
      },
      {
        id: "kmilk",
        name: "Kisans",
        text: "Kisans and Milk Producers",
        value: "",
      },
      {
        id: "kdelegate",
        name: "Kisans",
        text: "Delegates for Annual Conferences",
        value: "",
      },
    ],
    artist: [
      {
        id: "aperform",
        name: "Artist",
        text: "Artists-for performance",
        value: "",
      },
      {
        id: "afilm",
        name: "Artist",
        text: "Film Technicians",
        value: "",
      },
      {
        id: "astate",
        name: "Artist",
        text: "Sportsmen Participating in All India & State Tournaments",
        value: "",
      },
      {
        id: "anational",
        name: "Artist",
        text: "Sportsmen Participating in National Tournaments",
        value: "",
      },
      {
        id: "amountain",
        name: "Artist",
        text: "Mountaineering Expeditions organised by IMF",
        value: "",
      },
      {
        id: "apress",
        name: "Artist",
        text: "Press Correspondents accredited for press work",
        value: "",
      },
      {
        id: "apressdep",
        name: "Artist",
        text: "Spouse/companion/dependent children",
        value: "",
      },
    ],
    medical: [
      {
        id: "mdoctor",
        name: "MedicalProfessionals",
        text: "Doctors Allopathic",
        value: "",
      },
      {
        id: "mnurse",
        name: "MedicalProfessionals",
        text: "Nurses & Midwives",
        value: "",
      },
    ],
    others: [
      {
        id: "odelegate",
        name: "Other",
        text: "Delegates for attending Annual Conferences",
        value: "",
      },
      {
        id: "osewa",
        name: "Other",
        text: "Bharat Sewa Dal, Bangalore",
        value: "",
      },
      {
        id: "ocivil",
        name: "Other",
        text: "Volunteers of Service Civil International",
        value: "",
      },
      {
        id: "oteach",
        name: "Other",
        text: "Teachers of Primary, Secondary and Higher Secondary Schools",
        value: "",
      },
      {
        id: "ojohn",
        name: "Other",
        text:
          "Members of St. John Ambulance Brigade and Relief Welfare Ambulance Corps, Calcutta",
        value: "",
      },
    ],
    izzat: [
      {
        id: "izzatwork",
        name: "Izzat",
        text:
          "persons with monthly income not exceeding 1500/-, working in unorganised sectors – for journeys upto maximum 100 Kms",
        value: "₹25",
      },
    ],
  }),

  watch: {
    currentPage: "fetchData",
  },

  created: function() {
    this.fetchData();
    this.getallinfod();
  },

  mounted: function() {
    this.$nextTick(function() {
      this.today();
      this.toda();
    });
  },

  computed: {
    list() {
      return this.showname.map((itm, i) => {
        return { A: itm, B: this.showvalue[i] };
      });
    },
  },

  methods: {
    fetchData: function() {
      var xhr = new XMLHttpRequest();
      var self = this;
      xhr.open("GET", sheetUrl);
      xhr.onload = function() {
        self.entries = JSON.parse(xhr.responseText);
        console.log("yes", self.entries.values);
        // self.entries = self.entries.feed.entry;
      };
      xhr.send();
    },

    //for dissimilar source and destination
    sameselect() {
      var cities1 = document.getElementById("exampleFormControlSelect2_1");
      var cities2 = document.getElementById("exampleFormControlSelect2_2");
      cities2.remove(cities1.selectedIndex);
    },

    //for date ahead/from today
    today() {
      var today = new Date();
      var sliceddate =
        today.getFullYear() +
        "-" +
        ("0" + (today.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + today.getDate()).slice(-2);
      document.getElementById("myDate").setAttribute("min", sliceddate);
      document.getElementById("myDate").value = sliceddate;
    },

    toda() {
      var toda = new Date();
      var slicedate =
        toda.getFullYear() +
        "-" +
        ("0" + (toda.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + toda.getDate()).slice(-2);
      document.getElementById("dob").setAttribute("max", slicedate);
      document.getElementById("dob").value = slicedate;
    },

    agecalc() {
      var value = document.getElementById("dob").value;
      var dob = new Date(value);
      var today = new Date();

      var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
      if (isNaN(age)) {
        // will set 0 when value will be NaN
        age = 0;
      } else {
        document.getElementById("age").value = age;
      }
      this.age = age;
      this.invalid();
    },

    check() {
      //to get values in the array according to classtype from google sheets -
      if (this.classtype.includes("sleeper")) {
        for (let index = 1; index < this.entries.values.length; index++) {
          this.arr.push(this.entries.values[index][0]);
        }
      }
      if (this.classtype.includes("1stclass")) {
        for (let index = 1; index < this.entries.values.length; index++) {
          this.arr.push(this.entries.values[index][2]);
        }
      }
      if (this.classtype.includes("2ndclass")) {
        for (let index = 1; index < this.entries.values.length; index++) {
          this.arr.push(this.entries.values[index][1]);
        }
      }
      if (this.classtype.includes("acfirst")) {
        for (let index = 1; index < this.entries.values.length; index++) {
          this.arr.push(this.entries.values[index][3]);
        }
      }
      if (this.classtype.includes("ac2tier")) {
        for (let index = 1; index < this.entries.values.length; index++) {
          this.arr.push(this.entries.values[index][4]);
        }
      }
      if (this.classtype.includes("ac3tier")) {
        for (let index = 1; index < this.entries.values.length; index++) {
          this.arr.push(this.entries.values[index][5]);
        }
      }
      if (this.classtype.includes("acchaircar")) {
        for (let index = 1; index < this.entries.values.length; index++) {
          this.arr.push(this.entries.values[index][6]);
        }
      }
      if (this.classtype == "") {
        this.arr = [];
      }

      //give the above values to third layer of checkboxes based on various categories-

      for (let index = 0; index < this.$data.disable.length; index++) {
        this.$data.disable[index]["value"] = this.arr[index];
      }

      var lensize = this.$data.disable.length;
      for (
        let index = 0, qw = lensize;
        index < this.$data.patient.length;
        index++, qw++
      ) {
        this.$data.patient[index]["value"] = this.arr[qw];
      }

      lensize = this.$data.disable.length + this.$data.patient.length;
      for (
        let index = 0, qw = lensize;
        index < this.$data.senior.length;
        index++, qw++
      ) {
        this.$data.senior[index]["value"] = this.arr[qw];
      }

      lensize =
        this.$data.disable.length +
        this.$data.patient.length +
        this.$data.senior.length;
      for (
        let index = 0, qw = lensize;
        index < this.$data.awardee.length;
        index++, qw++
      ) {
        this.$data.awardee[index]["value"] = this.arr[qw];
      }

      lensize =
        this.$data.disable.length +
        this.$data.patient.length +
        this.$data.senior.length +
        this.$data.awardee.length;
      for (
        let index = 0, qw = lensize;
        index < this.$data.warwidow.length;
        index++, qw++
      ) {
        this.$data.warwidow[index]["value"] = this.arr[qw];
      }

      lensize =
        this.$data.disable.length +
        this.$data.patient.length +
        this.$data.senior.length +
        this.$data.awardee.length +
        this.$data.warwidow.length;
      for (
        let index = 0, qw = lensize;
        index < this.$data.students.length;
        index++, qw++
      ) {
        this.$data.students[index]["value"] = this.arr[qw];
      }

      lensize =
        this.$data.disable.length +
        this.$data.patient.length +
        this.$data.senior.length +
        this.$data.awardee.length +
        this.$data.warwidow.length +
        this.$data.students.length;
      for (
        let index = 0, qw = lensize;
        index < this.$data.youths.length;
        index++, qw++
      ) {
        this.$data.youths[index]["value"] = this.arr[qw];
      }

      lensize =
        this.$data.disable.length +
        this.$data.patient.length +
        this.$data.senior.length +
        this.$data.awardee.length +
        this.$data.warwidow.length +
        this.$data.students.length +
        this.$data.youths.length;
      for (
        let index = 0, qw = lensize;
        index < this.$data.kisans.length;
        index++, qw++
      ) {
        this.$data.kisans[index]["value"] = this.arr[qw];
      }

      lensize =
        this.$data.disable.length +
        this.$data.patient.length +
        this.$data.senior.length +
        this.$data.awardee.length +
        this.$data.warwidow.length +
        this.$data.students.length +
        this.$data.youths.length +
        this.$data.kisans.length;
      for (
        let index = 0, qw = lensize;
        index < this.$data.artist.length;
        index++, qw++
      ) {
        this.$data.artist[index]["value"] = this.arr[qw];
      }

      lensize =
        this.$data.disable.length +
        this.$data.patient.length +
        this.$data.senior.length +
        this.$data.awardee.length +
        this.$data.warwidow.length +
        this.$data.students.length +
        this.$data.youths.length +
        this.$data.kisans.length +
        this.$data.artist.length;
      for (
        let index = 0, qw = lensize;
        index < this.$data.medical.length;
        index++, qw++
      ) {
        this.$data.medical[index]["value"] = this.arr[qw];
      }

      lensize =
        this.$data.disable.length +
        this.$data.patient.length +
        this.$data.senior.length +
        this.$data.awardee.length +
        this.$data.warwidow.length +
        this.$data.students.length +
        this.$data.youths.length +
        this.$data.kisans.length +
        this.$data.artist.length +
        this.$data.medical.length;
      for (
        let index = 0, qw = lensize;
        index < this.$data.others.length;
        index++, qw++
      ) {
        this.$data.others[index]["value"] = this.arr[qw];
      }

      //to disable checkboxes if anyone among them is checked in first layer -
      this.testing = document.getElementsByClassName("seatclass");
      if (this.classtype.length == 1) {
        for (let i = 0; i < this.testing.length; i++) {
          if (!this.testing[i].checked) {
            this.testing[i].disabled = true;
          } else {
            this.testing[i].disabled = false;
          }
        }
      } else {
        for (let i = 0; i < this.testing.length; i++) {
          this.testing[i].disabled = false;
        }
      }

      //on unchecking first layer every layer gets unchecked
      if (this.classtype == "") {
        this.checkedconcession = [];
        this.showname = [];
        this.showvalue = [];
        this.contname = [];
        this.contvalue = [];
        this.totdisc = 0;
        document.getElementById("Total").value = 0;
        document.getElementById("Final").value = 0;
      }
    },

    selacheck() {
      this.contcheck();

      if (this.checkedconcession == "") {
        this.showname = [];
        this.showvalue = [];
        this.contname = [];
        this.contvalue = [];
        this.totdisc = 0;
        document.getElementById("Total").value = 0;
        document.getElementById("Final").value = this.final;
      }
    },

    contcheck() {
      this.contvalue = [];
      this.showvalue = [];
      this.showname = [];
      this.contvalue.length = 0;
      this.contarr = document.getElementsByTagName("input");
      for (var x = 0; x < this.contarr.length; x++) {
        for (let z = 0; z < this.contname.length; z++) {
          if (this.contarr[x].value == this.contname[z]) {
            this.contvalue.push(this.contarr[x].name);
            this.showname.push(this.contarr[x].value);
            this.showvalue.push(this.contarr[x].name);
          }
        }
      }
      /////////////////////////////////////////////////////////////////////////////////////////

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
      for (let mnc = 0; mnc < this.contname.length; mnc++) {
        if (
          this.contname[mnc] == "Orthopaedically Handicapped" ||
          this.contname[mnc] == "Mentally Retarded" ||
          this.contname[mnc] == "Blind Person" ||
          this.contname[mnc] == "Deaf and Dumb"
        ) {
          this.mndisable.push(this.contvalue[mnc]);
        } else if (
          this.contname[mnc] == "Cancer Patient" ||
          this.contname[mnc] == "Thalasssemia Patient" ||
          this.contname[mnc] == "Heart Patient" ||
          this.contname[mnc] == "Kidney Patient" ||
          this.contname[mnc] == "Haemophillia Patient" ||
          this.contname[mnc] == "T.B/Lupas Valgaris Patient" ||
          this.contname[mnc] == "Leprosy Patient" ||
          this.contname[mnc] == "AIDS Patient" ||
          this.contname[mnc] == "Ostomy Patient" ||
          this.contname[mnc] == "Aplastic Anaemia Patient" ||
          this.contname[mnc] == "Sickle Cell Anaemia Patient"
        ) {
          this.mnpatient.push(this.contvalue[mnc]);
        } else if (
          this.contname[mnc] == "Men-60 years and above" ||
          this.contname[mnc] == "Women-58 years and above"
        ) {
          this.mnsenior.push(this.contvalue[mnc]);
        } else if (
          this.contname[mnc] ==
            "Recipients of Police Medal-Men-60 years and above" ||
          this.contname[mnc] ==
            "Recipients of Police Medal-Women-60 years and above" ||
          this.contname[mnc] == "Shram Awardee" ||
          this.contname[mnc] == "National Teacher Awardee" ||
          this.contname[mnc] == "National Bravery Awardee"
        ) {
          this.mnawardee.push(this.contvalue[mnc]);
        } else if (
          this.contname[mnc] == "War Widow" ||
          this.contname[mnc] == "Widows of Policemen and Paramilitary" ||
          this.contname[mnc] == "Widows of I.P.K.F" ||
          this.contname[mnc] == "Widows of Defence" ||
          this.contname[mnc] == "Widows of Martyr Operation Vijay in Kargil"
        ) {
          this.mnwarwidow.push(this.contvalue[mnc]);
        } else if (
          this.contname[mnc] == "General Category" ||
          this.contname[mnc] == "SC/ST Category" ||
          this.contname[mnc] ==
            "Girls upto Graduation & Boys upto 12th standard between home & school" ||
          this.contname[mnc] == "Students of Govt. schools-for study tour" ||
          this.contname[mnc] == "Entrance exam-Girls of Govt. schools" ||
          this.contname[mnc] == "Students appearing for UPSC" ||
          this.contname[mnc] == "Foreign Student Studying in India" ||
          this.contname[mnc] == "Research Scholars upto age of 35" ||
          this.contname[mnc] == "Participating in Work Campus" ||
          this.contname[mnc] == "Cadets and Marine Engineers"
        ) {
          this.mnstudents.push(this.contvalue[mnc]);
        } else if (
          this.contname[mnc] == "Attending Camps of National Youth Project" ||
          this.contname[mnc] ==
            "Attending Camps of Manav Uththan Sewa Samiti" ||
          this.contname[mnc] ==
            "Unemployed youths-To attend interview for job in Public Sector Organisations" ||
          this.contname[mnc] ==
            "Unemployed youths-To attend interviews for jobs in Central & State Govt" ||
          this.contname[mnc] == "Bharat Scouts & Guides"
        ) {
          this.mnyouths.push(this.contvalue[mnc]);
        } else if (
          this.contname[mnc] == "Kisans and Industrial Labour" ||
          this.contname[mnc] == "Government Sponsored Special Trains" ||
          this.contname[mnc] == "Kisans and Milk Producers" ||
          this.contname[mnc] == "Delegates for Annual Conferences"
        ) {
          this.mnkisans.push(this.contvalue[mnc]);
        } else if (
          this.contname[mnc] == "Artists-for performance" ||
          this.contname[mnc] == "Film Technicians" ||
          this.contname[mnc] ==
            "Sportsmen Participating in All India & State Tournaments" ||
          this.contname[mnc] ==
            "Sportsmen Participating in National Tournaments" ||
          this.contname[mnc] == "Mountaineering Expeditions organised by IMF" ||
          this.contname[mnc] ==
            "Press Correspondents accredited for press work" ||
          this.contname[mnc] == "Spouse/companion/dependent children"
        ) {
          this.mnartist.push(this.contvalue[mnc]);
        } else if (
          this.contname[mnc] == "Doctors Allopathic" ||
          this.contname[mnc] == "Nurses & Midwives"
        ) {
          this.mnmedical.push(this.contvalue[mnc]);
        } else if (
          this.contname[mnc] == "Delegates for attending Annual Conferences" ||
          this.contname[mnc] == "Bharat Sewa Dal, Bangalore" ||
          this.contname[mnc] == "Volunteers of Service Civil International" ||
          this.contname[mnc] ==
            "Teachers of Primary, Secondary and Higher Secondary Schools" ||
          this.contname[mnc] ==
            "Members of St. John Ambulance Brigade and Relief Welfare Ambulance Corps, Calcutta"
        ) {
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

      //////////////////////////////////////////////////////////////////////////////////
      this.total();
      if (this.contname.length == 0) {
        this.totdisc = 0;
        document.getElementById("Total").value = 0;
        document.getElementById("Final").value = this.final;
      }
    },

    findmax(v) {
      this.temp = v;
      if (this.temp[0] < this.temp[1]) {
        this.max = this.temp[1];
        this.smax = this.temp[0];
      } else {
        this.max = this.temp[0];
        this.smax = this.temp[1];
      }
      for (let i = 2; i < this.temp.length; i++) {
        if (+this.temp[i] > +this.max) {
          this.smax = this.max;
          this.max = this.temp[i];
        } else if (+this.temp[i] > +this.smax) {
          // && +(this.temp[i]) != +(this.max)
          this.smax = this.temp[i];
        }
      }
      this.temp = [];
    },

    mntotalvalue(b) {
      //Discount percentage based on number of concessions selected
      this.mndiscvalue = 0;
      if (b.length == 1) {
        this.mndiscvalue = b.reduce((a, b) => +a + +b, 0);
      } else if (b.length == 2) {
        this.findmax(b);
        this.mndiscvalue = +this.max + (+this.smax * 5) / 100;
      } else if (b.length == 3) {
        this.findmax(b);
        this.mndiscvalue = +this.max + (+this.smax * 7) / 100;
      } else if (b.length > 3) {
        this.findmax(b);
        this.mndiscvalue = +this.max + (+this.smax * 10) / 100;
      }
      if (this.mndiscvalue != 0) this.mntotdisc.push(this.mndiscvalue);
    },

    total() {
      //Discount percentage based on number of concessions selected
      if (this.mntotdisc.length == 1) {
        this.disc = this.mntotdisc.reduce((a, b) => +a + +b, 0);
      } else if (this.mntotdisc.length == 2) {
        this.findmax(this.mntotdisc);
        this.disc = +this.max + (+this.smax * 5) / 100;
      } else if (this.mntotdisc.length == 3) {
        this.findmax(this.mntotdisc);
        this.disc = +this.max + (+this.smax * 7) / 100;
      } else if (this.mntotdisc.length > 3) {
        this.findmax(this.mntotdisc);
        this.disc = +this.max + (+this.smax * 10) / 100;
      }

      if (this.contvalue.includes("100") && this.contvalue.length >= 1) {
        alert("Discount cannot exceed 100%");
        this.disc = 100;
      }

      this.totdisc = this.disc;
      document.getElementById("Total").value = this.totdisc;
      this.final =
        document.getElementById("Price").value -
        (document.getElementById("Price").value * this.totdisc) / 100;
      document.getElementById("Final").value = this.final;
    },

    invalid() {
      this.invalid1();
      if (this.classtype.length > 0) {
        if (this.genderopt == "male") {
          if (this.age < 60) {
            document.getElementById("inlineCheckbox3").disabled = true;
            document.getElementById("inlineCheckbox5").disabled = true;
            document.getElementById("inlineCheckbox6").disabled = false;
            document.getElementById("inlineCheckbox7").disabled = false;
            if (document.getElementById("men")) {
              document.getElementById("men").disabled = true;
              document.getElementById("women").disabled = true;
            }
            if (document.getElementById("medalmen")) {
              document.getElementById("medalmen").disabled = true;
              document.getElementById("medalwomen").disabled = true;
            }
          } else {
            document.getElementById("inlineCheckbox3").disabled = false;
            document.getElementById("inlineCheckbox5").disabled = true;
            document.getElementById("inlineCheckbox6").disabled = true;
            document.getElementById("inlineCheckbox7").disabled = true;
            if (document.getElementById("men")) {
              document.getElementById("men").disabled = false;
              document.getElementById("women").disabled = true;
            }
            if (document.getElementById("medalmen")) {
              document.getElementById("medalmen").disabled = false;
              document.getElementById("medalwomen").disabled = true;
            }
          }
        } else {
          document.getElementById("inlineCheckbox3").disabled = false;
          document.getElementById("inlineCheckbox5").disabled = false;
          document.getElementById("inlineCheckbox6").disabled = false;
          document.getElementById("inlineCheckbox7").disabled = false;
          if (document.getElementById("men")) {
            document.getElementById("men").disabled = false;
            document.getElementById("women").disabled = false;
          }
          if (document.getElementById("medalmen")) {
            document.getElementById("medalmen").disabled = false;
            document.getElementById("medalwomen").disabled = false;
          }
        }

        if (this.genderopt == "female") {
          if (this.age < 58) {
            document.getElementById("inlineCheckbox3").disabled = true;
            document.getElementById("inlineCheckbox6").disabled = false;
            document.getElementById("inlineCheckbox7").disabled = false;
            if (document.getElementById("men")) {
              document.getElementById("men").disabled = true;
              document.getElementById("women").disabled = true;
            }
            if (document.getElementById("medalmen")) {
              document.getElementById("medalmen").disabled = true;
              document.getElementById("medalwomen").disabled = true;
            }
          } else {
            document.getElementById("inlineCheckbox3").disabled = false;
            document.getElementById("inlineCheckbox6").disabled = true;
            document.getElementById("inlineCheckbox7").disabled = true;
            if (document.getElementById("men")) {
              document.getElementById("men").disabled = true;
              document.getElementById("women").disabled = false;
            }
            if (document.getElementById("medalmen")) {
              document.getElementById("medalmen").disabled = true;
              document.getElementById("medalwomen").disabled = false;
            }
          }
        }
      }
    },

    invalid1() {
      if (this.genderopt == "male") {
        if (this.age < 60) {
          this.$data.concession[2]["bool"] = true;
          this.$data.concession[4]["bool"] = true;
          this.$data.concession[5]["bool"] = false;
          this.$data.concession[6]["bool"] = false;
          this.$data.senior[0]["bool"] = true;
          this.$data.senior[1]["bool"] = true;
          this.$data.awardee[0]["bool"] = true;
          this.$data.awardee[1]["bool"] = true;
          this.$data.students[4]["bool"] = true;
        } else {
          this.$data.concession[2]["bool"] = false;
          this.$data.concession[4]["bool"] = true;
          this.$data.concession[5]["bool"] = true;
          this.$data.concession[6]["bool"] = true;
          this.$data.senior[0]["bool"] = false;
          this.$data.senior[1]["bool"] = true;
          this.$data.awardee[0]["bool"] = false;
          this.$data.awardee[1]["bool"] = true;
          this.$data.students[4]["bool"] = true;
        }
      } else {
        this.$data.concession[2]["bool"] = false;
        this.$data.concession[4]["bool"] = false;
        this.$data.concession[5]["bool"] = false;
        this.$data.concession[6]["bool"] = false;
        this.$data.senior[0]["bool"] = false;
        this.$data.senior[1]["bool"] = false;
        this.$data.awardee[0]["bool"] = false;
        this.$data.awardee[1]["bool"] = false;
        this.$data.students[4]["bool"] = false;
      }

      if (this.genderopt == "female") {
        if (this.age < 58) {
          this.$data.concession[2]["bool"] = true;
          this.$data.senior[0]["bool"] = true;
          this.$data.senior[1]["bool"] = true;
          this.$data.awardee[0]["bool"] = true;
          this.$data.awardee[1]["bool"] = true;
        } else {
          this.$data.concession[5]["bool"] = true;
          this.$data.concession[6]["bool"] = true;
          this.$data.senior[0]["bool"] = true;
          this.$data.awardee[0]["bool"] = true;
        }
      }
    },

    onSubmit() {
      const formData = {
        source: this.selectsource,
        destination: this.selectdest,
        name: this.pname,
        Jdate: this.Jdate,
        dob: this.dob,
        age: this.age,
        gender: this.genderopt,
        Jclass: this.classtype[0],
        fare: this.fare,
        discount: this.totdisc,
        final: this.final,
        approved: false,
        concessiontype: this.showname,
        concessionvalue: this.showvalue,
      };
      console.log(formData);
      if (this.$store.getters.isAuthenticated) {
        const AuthStr = "Bearer ".concat(this.$store.getters.isToken);
        console.log(AuthStr);

        axios
          .post("/ticketinfo", formData, {
            headers: {
              Authorization: AuthStr,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log(res);
            console.log(res.data);
            alert(
              "Ticket Submitted Successfully. Your Ticket Reference Number: " +
                res.data._id
            );
            (this.selectsource = "Select Source"),
              (this.selectdest = "Select Destination"),
              (this.pname = ""),
              (this.Jdate = null),
              (this.dob = null),
              (this.age = 0),
              (this.genderopt = ""),
              (this.fare = null),
              (this.final = null),
              (this.totdisc = 0),
              (this.disc = 0),
              (this.checkedconcession = []),
              (this.classtype = []),
              (this.showvalue = []),
              (this.showname = []),
              (this.contvalue = []),
              (this.contname = []),
              (this.mndisable = []);
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
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    getallinfod() {
      if (this.$store.getters.isAuthenticated) {
        const AuthStr = "Bearer ".concat(this.$store.getters.isToken);
        axios
          .get("/ticketinfo/getticket/".concat(this.$store.getters.isUser), {
            headers: { Authorization: AuthStr },
          })
          .then((res) => {
            console.log(res);
            this.ticketsd = res.data;
            console.log(this.ticketsd);
          })
          .catch((err) => console.log(err));
      }
    },
    getbtnvalued(x) {
      this.btnvalued = x;
      console.log(this.btnvalued);
      if (this.$store.getters.isAuthenticated) {
        const AuthStr = "Bearer ".concat(this.$store.getters.isToken);
        axios
          .get("/ticketinfo/".concat(this.btnvalued), {
            headers: { Authorization: AuthStr },
          })
          .then((res) => {
            console.log(res);
            this.ticketd = res.data;
            console.log(this.ticketd);
            (this.sourced = this.ticketd.source),
              (this.destinationd = this.ticketd.destination),
              (this.pnamed = this.ticketd.name),
              (this.Jdated = this.ticketd.Jdate),
              (this.dobd = this.ticketd.dob),
              (this.aged = this.ticketd.age),
              (this.genderd = this.ticketd.gender),
              (this.Jclassd = this.ticketd.Jclass),
              (this.bookingaccd = null),
              (this.concessiontyped = []),
              (this.concessionvalued = []),
              (this.totdiscd = this.ticketd.discount),
              (this.finald = this.ticketd.final),
              (this.fared = this.ticketd.fare),
              (this.concessiontyped = this.ticketd.concessiontype),
              (this.concessionvalued = this.ticketd.concessionvalue),
              (this.bookingaccd = this.ticketd.bookingacc._id);
          })
          .catch((err) => console.log(err));
      }
    },

    poiuyt(g) {
      var zxcvq = false;
      this.zxcvarr = document.getElementsByClassName(g);
      for (let i = 0; i < this.zxcvarr.length; i++) {
        if (this.zxcvarr[i].checked) {
          zxcvq = true;
          break;
        }
      }

      if (zxcvq) {
        for (let i = 0; i < this.zxcvarr.length; i++) {
          if (!this.zxcvarr[i].checked) {
            this.zxcvarr[i].disabled = true;
          } else {
            this.zxcvarr[i].disabled = false;
          }
        }
      } else {
        for (let i = 0; i < this.zxcvarr.length; i++) {
          this.zxcvarr[i].disabled = false;
        }
      }
    },
  },
};
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
.lbutton {
  color: whitesmoke;
}
.lbuttonb {
  color: black;
  font-weight: bolder;
  font-size: 150%;
}

.lbutton:hover {
  color: #fc6500;
}

.lbuttonb:hover {
  color: #e40a0a;
}

.automargin {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  /* border: 1px solid #4CAF50; */
  background-color: #521751;
  /* box-sizing: border-box; */
}
.automarginb {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  /* border: 1px solid #4CAF50; */
  background-color: #ebfc00;
  /* box-sizing: border-box; */
}
.logo {
  color: red;
  font-weight: bold;
  font-size: 20px;
}
.logor {
  color: red;
  /* font-weight: bold; */
  font-size: 50px;
}
#ticketdata {
  margin-bottom: 50px;
}
#pentickets {
  margin-bottom: 60px;
}
label {
  text-align: center;
  font-size: 130%;
  font-weight: bolder;
}
input {
  text-align: center;
  font-size: 130%;
  font-weight: bold;
}
.bitems {
  font-size: 150%;
  font-weight: bolder;
  color: #3827d4;
}

h1,
p {
  text-align: center;
}
p {
  color: red;
}

.center {
  margin: auto;
}
</style>
