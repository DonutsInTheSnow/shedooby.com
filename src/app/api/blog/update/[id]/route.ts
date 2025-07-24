import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// export async function POST(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const formData = await request.formData();
//     const title = formData.get('title') as string;
//     const body = formData.get('body') as string;
//     const image = formData.get('image') as File | null;

//     if (!title || !body) {
//       return NextResponse.json({ error: 'Title and body are required' }, { status: 400 });
//     }

//     let imagePath: string | null = null;
//     if (image) {
//       const fileName = `${Date.now()}-${image.name}`;
//       const { error: uploadError } = await supabaseAdmin.storage
//         .from('blog-images')
//         .upload(`public/${fileName}`, image);
//       if (uploadError) {
//         return NextResponse.json({ error: 'Image upload failed: ' + uploadError.message }, { status: 500 });
//       }
//       imagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/public/${fileName}`;
//     }

//     const { error } = await supabaseAdmin.from('blog_posts').update({
//       title,
//       body,
//       ...(imagePath && { image: imagePath }),
//     }).eq('id', params.id);

//     if (error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }


export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // Await params
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const body = formData.get('body') as string;
    const image = formData.get('image') as File | null;

    if (!title || !body) {
      return NextResponse.json({ error: 'Title and body are required' }, { status: 400 });
    }

    let imagePath: string | null = null;
    if (image) {
      const fileName = `${Date.now()}-${image.name}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from('blog-images')
        .upload(`public/${fileName}`, image);
      if (uploadError) {
        return NextResponse.json({ error: 'Image upload failed: ' + uploadError.message }, { status: 500 });
      }
      imagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/public/${fileName}`;
    }

    const { error } = await supabaseAdmin.from('blog_posts').update({
      title,
      body,
      ...(imagePath && { image: imagePath }),
    }).eq('id', id); // Use awaited id

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}