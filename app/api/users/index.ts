import { UserAccount } from "@/utils/types";


export const getUserAccount = async () : Promise<Array<UserAccount> | null> => {
   try {
       const getAPIUser = process.env.NEXT_GET_API_USER_URL as RequestInfo | URL;
       await fetch(getAPIUser, {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json',
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