
/**
 * Generate ID for posts and comments section
 */
export function generateID() {
    return Math.random().toString(36).substr(2, 16);
}