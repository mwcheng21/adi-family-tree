# Balkan App For Non-Developers (BAND)

# Inspiration
My family wanted to create a family tree and a quick google search yielded many solutions, with web applications like ancestry or familytreebuilder and libraries like BalkanJS, dTree, or GoJS. However, web applications provided no flexibility, and libraries provided no secure public interface. Therefore we attempt to develop BAND, using the BalkanJS App for non-developers, to address the shortcomings of the current solutions. We aim to address the following main 4 problems:   
- Allow custom fields. Neccesary for instance, if a family has both chinese and english names.  
- Allow multiple users to edit. Allows for simple creation of trees without having to communicate back and forth with distant relatives. A simple link will do.  
- Allow online viewing with security. View the tree from anywhere (secretly on on your phone at family weddings) and not simply an image like some current solutions. Still maintain security of the public facing tree.  
- Allow tree creation and viewing without an account. In my research a significant amount of time was spent creating accounts and email verification, only to realize the paid solution, ugly interface, or failing the above requirements. Additionally, users should not have to create accounts to view a tree.  

# What it does
A flexible, secure, accessible way to create and share family trees.  

This platform uses the BalkanJS Family Tree components to build, share, and view custom family trees without needing to create an account. It accomplishes this through a password to view the tree, and a different password to edit. This allows viewing or editing either by searching for the tree name, or sharing a link. A quick start and minimal barrier to creation.

# How we built it
### Backend
It took 3 hours to set up the backend, being the first time using WTForms and Flask-SQLAlchemy. We created 2 tables, one for tree information and passwords, and the other for user information. Flask routing was simple to create, although we had a few bugs with user sessions, since if logged in, we don't require passwords to trees you own. We then deployed to [pythonanywhere](https://www.pythonanywhere.com/) for a public facing prototype.  

### Frontend
Learning to use BalkanJS consumed the most time on the frontend side, as the library is not designed for client-server interaction. It took about 4 hours to get the creating, editing, and saving of trees to work correctly, after which we used [Bulma.io](https://bulma.io/) and [Bootstrap](https://getbootstrap.com/) to style the pages. For the home page we took inspiration from a [bootstrap template](https://startbootstrap.com/template/modern-business). Our site consists of a home page, login pages (login, logout, sign up), tree pages (view, create, edit), and an admin page for users who do create an account and have multiple trees to manage.  

# What's next for Family Tree
- Allow uploading images from computer (currently only links)  
- Share button to easily share trees  
- Edit profile (change password, username, email, profile picture)  
- Multiple card customizations to select from  
- Controls for trackpad users  


# Built With
- Balkan JS 
- Bulma  
- Bootstrap  
- font-awesome  
- jQuery  
- Flask  
- WTForms  
- Flask-SQLAlchemy (uses sqlite)  

# Try it out
[https://mwcheng.pythonanywhere.com/](https://mwcheng.pythonanywhere.com/)



