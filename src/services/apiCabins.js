
import supabase from "./supabase"

export async function getCabins() {
  try {
    const { data, error } = await supabase
      .from('cabins')
      .select('*')

    if (error) {
      console.error('Supabase error:', error)
      throw new Error('Cabins could not be loaded')
    }

    console.log('Cabins data:', data)
    return data
  } catch (err) {
    console.error('Fetch error:', err)
    throw err
  }
}



export async function deleteCabin(id){

    const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)


  if (error) {
    console.error(error)
    throw new Error('Cabins could not be deleted')
  }
  
}