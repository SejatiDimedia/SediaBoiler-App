
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBucket() {
    console.log('Checking buckets...');

    // Skip listing and try direct upload
    const BUCKET_NAME = 'SediaBoilerImage';

    console.log(`Testing upload to '${BUCKET_NAME}' directly...`);
    const { data, error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(`test-${Date.now()}.txt`, 'Test file content', { upsert: false });

    if (uploadError) {
        console.error('❌ Upload failed:', uploadError);
        if (uploadError.statusCode === '404' || uploadError.message.includes('not found')) {
            console.error('👉 Bucket NOT FOUND. Please ensure a PUBLIC bucket named "images" exists.');
        } else {
            console.error('👉 Permission Denied or other error. Check RLS policies.');
        }
    } else {
        console.log('✅ Upload successful:', data);
        console.log('👉 Permissions seem correct!');
    }
}

checkBucket();
