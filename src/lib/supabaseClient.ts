import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const fetchMerch = async () => {
  const { data, error } = await supabase
    .from('merch')
    .select('*');

  console.log('Fetched merch:', data);

  if (error) {
    console.error('Error fetching merch:', error);
    return [];
  }
  return data;
};

export const fetchBlog = async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*');

  console.log('Fetched blog_posts:', data);

  if (error) {
    console.error('Error fetching blog_posts:', error);
    return [];
  }
  return data;
};