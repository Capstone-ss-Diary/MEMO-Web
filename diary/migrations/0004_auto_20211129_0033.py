# Generated by Django 3.1.7 on 2021-11-28 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diary', '0003_auto_20211128_2356'),
    ]

    operations = [
        migrations.AlterField(
            model_name='diaryimage',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='diarytext',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
