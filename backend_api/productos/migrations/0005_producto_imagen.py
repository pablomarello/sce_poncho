# Generated by Django 5.0.6 on 2024-09-04 20:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0004_alter_producto_nombre'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='imagen',
            field=models.ImageField(blank=True, null=True, upload_to='productos/'),
        ),
    ]
