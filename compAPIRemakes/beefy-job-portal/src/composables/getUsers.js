import { ref } from "vue";

const getUsers = () =>{
    const users = ref([])
    const error = ref(null)
    const load = async() =>{
        try {
            let data = await fetch("http://localhost:3000/users")
            if(!data.ok){
                throw Error("no user data available")
            }
            users.value = await data.json()
        } catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    return {users, error, load}
}

export default getUsers

