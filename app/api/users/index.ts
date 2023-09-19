import { UserAccount } from "@/utils/types";


export const getAccounts = async () : Promise<Array<UserAccount> | null> => {
   try {
       const getAPIUser = process.env.NEXT_GET_API_USER_URL as RequestInfo | URL;
       await fetch(getAPIUser, {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}` // Send the token in the Authorization header
           },
       }).then(res => {
        if(!res.ok){
            throw new Error('Unexpected Error has occured!');
        }
        return res.json();
       })
   } catch (error) {
        console.error('Get Account Info Error', error);
   }
   return null;
}