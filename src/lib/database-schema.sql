-- Database Schema for United with Christ through the Holy Spirit Church

-- Users table for authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('admin', 'pastor', 'member')),
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Daily content table for dashboard posts by date
CREATE TABLE daily_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL UNIQUE, -- Only one entry per date
    intercessor VARCHAR(200),
    opening TEXT[], -- Array of verse references
    lessons TEXT[], -- Array of verse references
    vision TEXT[], -- Array of verse references
    speaker TEXT[], -- Array of verse references
    custom_sections JSONB DEFAULT '[]'::jsonb, -- Array of {title: string, verses: string[]}
    notes TEXT, -- Can be null
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Session tokens for authentication
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_daily_content_date ON daily_content(date);
CREATE INDEX idx_user_sessions_token ON user_sessions(token);
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_expires_at ON user_sessions(expires_at);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update the updated_at column
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_content_updated_at
    BEFORE UPDATE ON daily_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Default admin user (password should be hashed in real implementation)
-- INSERT INTO users (email, first_name, last_name, password_hash, role, is_verified)
-- VALUES ('admin@church.org', 'Admin', 'User', '$2b$10$...', 'admin', true);