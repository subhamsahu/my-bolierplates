import sys

class ManagementUtility:
    def __init__(self,argv=None) -> None:
        self.argv = argv or sys.argv[:]

    def execute(self):
        """
        Given the command-line arguments, figure out which subcommand is being
        run, create a parser appropriate to that command, and run it.
        """
        try:
            subcommand = self.argv[1]
        except IndexError:
            subcommand = "help"  # Display help if no arguments were given.
        if subcommand == "help":
            pass
        # Special-cases: We want 'django-admin --version' and
        # 'django-admin --help' to work, for backwards compatibility.
        elif subcommand == "version" or self.argv[1:] == ["--version"]:
            sys.stdout.write("Not Available" + "\n")
        elif self.argv[1:] in (["--help"], ["-h"]):
            sys.stdout.write(self.main_help_text() + "\n")
        else:
            self.createsuperuser()

    def createsuperuser(self):
        try:
            from getpass import getpass
            import asyncio
            from app.main import startup_services, cleanup_services
            from app.services.user_service import AdminUserService
            asyncio.run(startup_services())
            email = input("Email: ")
            phone = input("Phone: ")
            password = getpass("Password: ")
            password2 = getpass("Re-Type Password: ")
            if password != password2:
                raise Exception("Password Doesn't Match")
            user_data = {
                "email":email,
                "phone": phone,
                "password":password
            }
            print(user_data)
            admin_user_service = AdminUserService()
            ret_val = admin_user_service.create_admin_user(user_data)
            if ret_val:
                print("Super User Created Successfully")
            else:
                print("Exception Happened") 
        except Exception as e:
            print(f"Excepetion Happened {str(e)}")
        finally:
            asyncio.run(cleanup_services())



def execute_from_command_line(argv=None):
    """Run a ManagementUtility."""
    utility = ManagementUtility(argv)
    utility.execute()