import User, { IUser } from '../models/User';

export class UserService {
    async getUserById(id: string): Promise<IUser | null> {
        return await User.findById(id); // Fetch user by ID
    }
    async getAllUsers() {
        return await User.find();
       
    }
    // Method to create a user
    async createUser(userData: { name: string; email: string; password: string; projectId: string }): Promise<IUser> {
        const user = new User(userData);
        await user.save();
        return user;
    }

    // Method to update a user
    async updateUser(id: string, updateData: { name?: string; email?: string; password?: string; projectId?: string }): Promise<IUser | null> {
        return await User.findByIdAndUpdate(id, updateData, { new: true });
    }

    // Additional methods can be added here, such as finding users by projectId
}
