

def check_if_user_already_doesnt_own_the_book(current_user, selected_book):
    if selected_book not in current_user.owned_books.all():
        return True

    return False


def check_if_book_is_not_inside_the_cart(current_user, selected_book, cart):

    if selected_book not in cart.cart_books.all():
        return True
    
    return False
