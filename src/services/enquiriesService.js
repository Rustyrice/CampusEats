import { supabase } from "../config/client";

const fetchEnquiries = async () => {
    const { data, error } = await supabase
      .from("enquiries")
      .select()
      .order("id", { ascending: false }); // order by descending id so most recent at top
    
    if (error) {
      console.error(`Error fetching enquiries ${error}`);
      throw error;
    }
  
    if (data) {
      return data.map((enquiry) => ({
        id: enquiry.id,
        text: enquiry.text,
        replies: enquiry.replies || [],
        isOpen: enquiry.isOpen,
      }));
    }
  };
  
  
  const addEnquiry = async (newEnquiry) => {
    const { data, error } = await supabase
      .from("enquiries")
      .insert(newEnquiry)
      .select();
  
    if (error) {
      console.error(`Error adding enquiry ${error}`);
      throw error;
    }
  
    if (data) {
      return data[0];
    }
  };
  
  const updateEnquiry = async (id, updatedEnquiry) => {
    const { data, error } = await supabase
      .from("enquiries")
      .update(updatedEnquiry)
      .match({ id })
      .select();
  
    if (error) {
      console.error(`Error updating enquiry ${error}`);
      throw error;
    }
  
    if (data) {
      return data[0];
    }
  };
  
  export default {
    fetchEnquiries,
    addEnquiry,
    updateEnquiry,
  };