// import User, { IUser } from '../models/User';

// export class UserService {
   
//     async getUserById(id: string): Promise<IUser | null> {
//         return await User.findById(id); // Fetch user by ID
//     }
//     async getAllUsers() {
//         return await User.find();
       
//     }
//     // Method to create a user
//     async createUser(userData: { name: string; email: string; password: string; projectId: string }): Promise<IUser> {
//         const user = new User(userData);
//         await user.save();
//         return user;
//     }
//     export const login_user = async (email: string) => {
//         try {
//           // Find the user by email
//           const user = await User.findOne({ email });
//           return user;
//         } catch (error) {
//           console.error('Error finding user:', error);
//           throw new Error('Error finding user');
//         }
//       };

//     // Method to update a user
//     async updateUser(id: string, updateData: { name?: string; email?: string; password?: string; projectId?: string }): Promise<IUser | null> {
//         return await User.findByIdAndUpdate(id, updateData, { new: true });
//     }

//     // Additional methods can be added here, such as finding users by projectId
// }
import User, { IUser } from '../models/User';

export class UserService {
   async login_user(email: any) {
       
        try {
            const user = await User.findOne({ email });
            return user;
          } catch (error) {
            console.error('Error finding user:', error);
            throw new Error('Error finding user');
          }
    }

    // Method to get a user by ID
    async getUserById(id: string): Promise<IUser | null> {
        return await User.findById(id); // Fetch user by ID
    }

    // Method to get all users
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
}

