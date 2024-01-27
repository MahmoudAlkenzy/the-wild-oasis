import supabase from './supabase';

export async function getCabins() {
    let { data, error } = await supabase.from('cabins').select('*');
    if (error) {
        console.error(error.message);
        throw new Error('The cabins could not be loaded');
    }
    return data;
}

export async function createCabins(cabin) {
    const { data, error } = await supabase
        .from('cabins')
        .insert([cabin])
        .select();
    if (error) {
        console.error(error.message);
        throw new Error('The cabins could not be created');
    }
    return data;
}

export async function deleteCabins(id) {
    console.log(id);
    const { data, error } = await supabase.from('cabins').delete().eq('id', id);

    if (error) {
        console.error(error.message);
        throw new Error('Cabin could not be deleted');
    }

    return data;
}
