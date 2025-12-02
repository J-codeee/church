require('dotenv').config({ path: '.env.local' });
const { sql } = require('@vercel/postgres');

async function createPasswordResetTable() {
  try {
    console.log('Creating password_reset_tokens table...');

    await sql`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) NOT NULL,
        token VARCHAR(255) UNIQUE NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('✓ Table created successfully!');

    console.log('Creating indexes...');

    await sql`CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_email ON password_reset_tokens(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at)`;

    console.log('✓ Indexes created successfully!');
    console.log('\n✓ Password reset table setup complete!');

    process.exit(0);
  } catch (error) {
    console.error('Error creating table:', error);
    process.exit(1);
  }
}

createPasswordResetTable();
