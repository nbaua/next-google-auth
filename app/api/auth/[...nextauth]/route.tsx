import NextAuth, { SessionOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from '../../../database/connections'
import User from '../../../database/user.model'

const providerKeys: any = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SK
}

const handler = NextAuth({
    providers: [
        GoogleProvider(providerKeys)
    ],

    async session({ session }: any) {
        try {
            const userOnline = await User.findOne({ email: session.user.email })
            session.user.id = userOnline._id.toString();

            return session;
        } catch (error) {
            return error;
        }
    },

    async signIn({ profile }: any) {
        try {
            await connectToDatabase();

            const userAlreadyExists = await User.findOne({ email: profile.email })

            if (!userAlreadyExists) {
                await User.create(
                    {
                        email: profile.email,
                        username: profile.name.replace(' ', ''),
                        picture: profile.picture
                    }
                )
            }

            return true;
        } catch (error) {
            console.log('Can not connectToDatabase > ' + error);
            return false;
        }
    }

});

export { handler as GET, handler as POST };