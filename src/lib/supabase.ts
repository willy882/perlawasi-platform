import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to upload images
export async function uploadImage(file: File, bucket: string = 'products') {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

    if (error) {
        throw error
    }

    const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

    return urlData.publicUrl
}

// Helper function to delete images
export async function deleteImage(url: string, bucket: string = 'products') {
    const fileName = url.split('/').pop()

    if (!fileName) return

    const { error } = await supabase.storage
        .from(bucket)
        .remove([fileName])

    if (error) {
        throw error
    }
}
