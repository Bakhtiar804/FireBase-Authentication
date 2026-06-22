import { auth, updateEmail, updatePassword, onAuthStateChanged, signOut, verifyBeforeUpdateEmail, deleteUser, deleteDoc, doc, db } from './fireBaseConfig.js';



let updateEmailBtn = document.getElementById('updateEmailBtn');
let updatePassBtn = document.getElementById('updatePassBtn');

const userUpdateEmailPassword = () => {
    const user = auth.currentUser;

    // Check karein ke user login hai bhi ya nahi
    if (!user) {
        Swal.fire({
            icon: 'warning',
            title: 'Logged Out',
            text: 'No user is currently logged in.',
            width: '320px',
            confirmButtonColor: '#3085d6'
        });
        return;
    }

    const newEmail = document.getElementById('newEmail').value.trim();
    const newPass = document.getElementById('newPassword').value.trim();

    if (newEmail !== "") {

        verifyBeforeUpdateEmail(user, newEmail)
            .then(() => {
                console.log('Verification email sent to NEW email.');

                // Compact Success SweetAlert for email update link
                return Swal.fire({
                    icon: 'success',
                    title: 'Link Sent!',
                    text: `Verification link sent to ${newEmail}. Please click it to verify.`,
                    width: '300px',
                    heightAuto: true,
                    confirmButtonColor: '#3085d6'
                });
            })
            .then(() => {
                document.getElementById('newEmail').value = "";
                signOut(auth).then(() => {
                    window.location.href = "index.html";
                });
            })
            .catch((error) => {
                console.error('Email update error:', error.message);
                handleAuthError(error);
            });


        // updateEmail(user, newEmail)
        //     .then(() => {
        //         console.log('Email updated successfully');
        //         alert('Email updated successfully!');
        //         document.getElementById('newEmail').value = "";
        //     })
        //     .catch((error) => {
        //         console.error('Email update error:', error.message);
        //         handleAuthError(error);
        //     });
    }

    if (newPass !== "") {
        updatePassword(user, newPass)
            .then(() => {


                // Compact Success SweetAlert for Password Update
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Password updated successfully!',
                    width: '320px',
                    timer: 1500,
                    showConfirmButton: false
                });
                document.getElementById('newPassword').value = "";
            })
            .catch((error) => {
                console.error('Password update error:', error.message);
                handleAuthError(error);
            });
    }


    if (newEmail === "" && newPass === "") {
        Swal.fire({
            icon: 'info',
            title: 'Empty Fields',
            text: 'Please fill at least one field to update.',
            width: '320px',
            confirmButtonColor: '#3085d6'
        });
    }

}

const handleAuthError = (error) => {
    if (error.code === 'auth/requires-recent-login') {

        // Compact Re-auth Guard SweetAlert
        Swal.fire({
            icon: 'error',
            title: 'Security Notice',
            text: 'Please log in again to update your security settings.',
            width: '300px',
            heightAuto: true,
            confirmButtonColor: '#3085d6'
        }).then(() => {
            signOut(auth).then(() => {
                window.location.href = "index.html";
            });
        });
    } else {
        // Fallback for general firebase errors
        Swal.fire({
            icon: 'error',
            title: 'Action Failed',
            text: error.message,
            width: '300px',
            heightAuto: true,
            confirmButtonColor: '#3085d6'
        });
    }
}

updateEmailBtn.addEventListener('click', userUpdateEmailPassword);
updatePassBtn.addEventListener('click', userUpdateEmailPassword);




const logoutBtn = document.getElementById('signOutBtn');

logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.replace("index.html"); // Fixed your assignment replacement bug safely
    });
});




const deleteAccountBtn = document.getElementById('deleteDataBtn');

deleteAccountBtn.addEventListener('click', async () => {
    const user = auth.currentUser;
    console.log(user.uid);
    const userId = user.uid;
    try {
        await deleteDoc(doc(db, "users", userId));
        // swal for ask yes or no to delete firestore data
        Swal.fire({
            icon: 'warning',
            title: 'Ask Yes or No',
            text: 'Are you sure you want to delete your data?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                try {

                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Your data has been deleted from the database.',
                        width: '320px',
                        timer: 1000,
                        showConfirmButton: false
                    }).then(() => {
                        window.location.replace("index.html");
                    });
                } catch (error) {
                    console.error("Error during post-deletion process:", error);
                    // Optionally, you can show an alert here if you want to notify the user about this failure.
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred while processing your request.',
                        width: '320px',
                        confirmButtonColor: '#3085d6'
                    });
                }
            }
            else {
                // User clicked "No"
                // Optionally, you can show a cancellation message here.
                Swal.fire({
                    icon: 'info',
                    title: 'Cancelled',
                    text: 'Your data deletion has been cancelled.',
                    width: '320px',
                    confirmButtonColor: '#3085d6'
                });

            }
        });

    } catch (error) {
        console.error("Error deleting user data from Firestore:", error);
        // Optionally, you can show an alert here if you want to notify the user about this failure.    
    }

});



const deleteLoginBtn = document.getElementById('deleteAuthBtn');
const deleteUserAccount = async () => {
    const user = auth.currentUser;
    try {
        await deleteUser(user).then(() => {
            // User deleted.

            //  swal for ask yes or no to delete account    
            Swal.fire({
                icon: 'warning',
                title: 'Ask Yes or No',
                text: 'Are you sure you want to delete your account?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    // User clicked "Yes"
                    // Proceed with deletion
                    try {
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'Your account has been deleted successfully.',
                            width: '320px',
                            timer: 1000,
                            showConfirmButton: false
                        }).then(() => {
                            window.location.replace("index.html");
                        });
                    } catch (error) {
                        console.error("Error during post-deletion process:", error);
                        // Optionally, you can show an alert here if you want to notify the user about this failure.
                        swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'An error occurred while processing your request.',
                            width: '320px',
                            confirmButtonColor: '#3085d6'
                        });
                    }
                }
                else {
                    // User clicked "No"
                    // Optionally, you can show a cancellation message here.
                    Swal.fire({
                        icon: 'info',
                        title: 'Cancelled',
                        text: 'Your account deletion has been cancelled.',
                        width: '320px',
                        confirmButtonColor: '#3085d6'
                    });
                }
            });
        }).catch((error) => {
            console.error("Error deleting account:", error);
            // Optionally, you can show an alert here if you want to notify the user about this failure.   
            Swal.fire({
                icon: 'error',
                title: 'Error', 
                text: 'It requires Recent Login.',
                width: '320px',
                confirmButtonColor: '#3085d6'
            }); 
        });
    } catch (error) {
        console.error("Error deleting user account:", error);
        // Optionally, you can show an alert here if you want to notify the user about this failure.    
    }
}


deleteLoginBtn.addEventListener('click', deleteUserAccount);

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Welcome! User is authenticated.");
        const userEmailField = document.getElementById('user-email');

        if (userEmailField) {
            userEmailField.innerText = user.email;
        }
    }
});