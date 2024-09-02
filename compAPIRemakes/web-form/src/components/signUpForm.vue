<template>
  <form @submit.prevent="handleSubmit">
    <label for="">First name</label>
    <input type="text" v-model="fname"/>
    <div class="error" v-if="nameError">
        {{ nameError }}
    </div>

    <label for="">Email</label>
    <input type="email" v-model="email"/>
    <div class="error" v-if="emailError">
        {{ emailError }}
    </div>

    <label for="">Password</label>
    <input type="password" v-model="password"/>
    <div class="error" v-if="passwordError">
        {{ passwordError }}
    </div>

    <label for="">Role</label>
    <select name="" id="" v-model="role">
        <option value="dev">developer</option>
        <option value="des">designer</option>
    </select>
    <div class="error" v-if="roleError">
        {{ roleError }}
    </div>


    <div>
        <input type="checkbox" v-model="names" value="Tadeo">
        <label for="">Tadeo</label>
    </div>
    <div>
        <input type="checkbox" v-model="names" value="Lucas">
        <label for="">Lucas</label>
    </div>
    <div>
        <input type="checkbox" v-model="names" value="John">
        <label for="">John</label>
    </div>
    <label for="">skills</label>
    <input type="text" @keyup.alt="addNewSKill" v-model="tempSkill">
    <div class="pill" v-for="(skill, index) in skills" :key="index" @click="removeSkill(index)">
        {{ skill }}
    </div>

    <div class="submit">
         <button>Create an Account</button>
     </div>
  </form>

  <p>Firstname: {{ fname }}</p>
  <p>Email: {{ email }}</p>
  <p>Password: {{ password }}</p>
  <p>Role: {{ role }}</p>
  <p>Terms: {{ terms }}</p>
  <p>Names: {{ names }}</p>
  <p>Skills: {{ skills }}</p>
</template>

<script setup>
// imports ------------------
import { ref, computed } from "vue";



// properties
const fname = ref(""),
    email = ref(""),
    password = ref(""),
    role = ref(""),
    terms = ref(false),
    names = ref([]),
    tempSkill = ref(""),
    skills = ref(["html", "css"]),
    passwordError = ref(""),
    emailError = ref(""),
    roleError = ref(""),
    nameError = ref("")


// methods
const addNewSKill = (e) =>{
    if(e.key === ',' && tempSkill.value){
        if(!skills.value.includes(tempSkill.value)){   //checks if the input value is not already in the list of skills
            skills.value.push(tempSkill.value)          //adds the tempskill(the input value) to the list of skills
        }
        tempSkill.value = "" //clears the input
    }
}

const removeSkill = (index)=>{
    skills.value.splice(index, 1)
}

const handleSubmit = () =>{
    console.log("form submitted")
    passwordError.value = password.value.length > 5 ? "" : "Password must be at least 6 chars long"
    roleError.value = role.value =="dev" || role.value =="des" ? "" : "Please select a role"
    nameError.value = name.value === "" ? "" : "Please enter a name"

    //validate email
    emailError.value = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))? "": "Please enter a valid email address"

    if (passwordError.value) {
        console.log('password error: ', passwordError.value)
    }
    if (emailError.value) {
        console.log('email error: ', emailError.value)
    }
    if (roleError.value) {
        console.log('role error: ', roleError.value)
    }
    if (nameError.value) {
        console.log('name error: ', nameError.value)
    }
}


</script>

<style>
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input, select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
input[type="checkbox"]{
    display: inline-block;
    width: 16px;
    margin: 0 10px 0 0;
    position: relative;
    top: 2px;
}
.pill{
    display: inline-block;
    margin: 20px 10px 0 0;
    padding: 6px 12px;
    background: #eee;
    border-radius: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #777;
    cursor: pointer;
}
button{
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    margin-top: 40px;
    color: white;
    border-radius: 20px;
}
.submit{
    text-align: center;
}
.error{
    color: #ff0062;
    margin-top: 10px;
    font-size: 0.8em;
    font-weight: bold;
}
</style>