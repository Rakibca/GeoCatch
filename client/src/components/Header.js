/*
Header is a thin sticky bar that follows the color scheme
Top right of the header has a "login/logout" functionality
Clicking login prompts a modal to appear with a username and password
On the modal is a button for login with credentials
Bottom of modal is the sign up button
Ensure Chakra-UI is followed semantically
Header is on every page
*/
import React from "react";

function Header() {
	return (
		<header>
			<h1>GeoCatch</h1>
			<div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
				<div className="inline-block">
					<div className="inline-flex items-center max-w-full">
                        {/* Give button functionality to allow user to sign in or sign out */}
                        {/* If user does not have an account, then allow sign in page to render into sign up */}
						<button
							className="flex items-center flex-grow-0 flex-shrink pl-2 relative w-60 border rounded-full px-1  py-1"
							type="button"
						>
							<div className="block flex-grow flex-shrink overflow-hidden">
                                {/* Requires added functionality to prompt the login form */}
                                {/* If logged in, then the button logs user out */}
								Login/Logout
							</div>
							<div className="flex items-center justify-center relative  h-8 w-8 rounded-full"></div>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;