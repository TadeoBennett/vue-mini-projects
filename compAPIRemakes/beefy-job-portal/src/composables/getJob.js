import { ref } from 'vue'   //the ref component needs to be imported here to be used


const getJob = (id) => {
    const job = ref(null)    //empty value for the post
    const error = ref(null)
    const load = async () => {
        try {
            let data = await fetch("http://localhost:3000/jobs/" + id)
            if (!data.ok) {           //checking if the data was not ok (it is a value in the response)
                throw Error("no data available for job")
            }
            //parse the data into json
            job.value = await data.json()
        } catch (err) {
            //remember to use the .value for the ref variable
            error.value = err.message
            console.log(error.value)
        }
    }
    //returns the values so it is captured when invoked in a component
    return { job, error, load }
};


export default getJob