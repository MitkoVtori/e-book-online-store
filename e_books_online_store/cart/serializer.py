
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'


class AddToCartSerializer(CartSerializer):
    pass
