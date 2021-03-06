# Generated by Django 3.2.7 on 2021-12-09 13:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Diary',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('user_id', models.IntegerField(null=True)),
                ('created_date', models.CharField(max_length=100, null=True)),
                ('published_date', models.DateTimeField(blank=True, null=True)),
                ('backColor', models.CharField(max_length=100, null=True)),
            ],
            options={
                'db_table': 'Diary',
            },
        ),
        migrations.CreateModel(
            name='HandWriting',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('user_id', models.IntegerField(null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='hand_writing/')),
            ],
            options={
                'db_table': 'HandWriting',
            },
        ),
        migrations.CreateModel(
            name='DiaryText',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('coordinateX', models.FloatField(null=True)),
                ('coordinateY', models.FloatField(null=True)),
                ('font', models.CharField(max_length=100, null=True)),
                ('font_size', models.FloatField(null=True)),
                ('font_color', models.CharField(max_length=100, null=True)),
                ('diary', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diary.diary')),
            ],
            options={
                'db_table': 'Diary_Text',
            },
        ),
        migrations.CreateModel(
            name='DiarySticker',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(max_length=300, null=True)),
                ('width', models.FloatField(null=True)),
                ('height', models.FloatField(null=True)),
                ('imageX', models.FloatField(null=True)),
                ('imageY', models.FloatField(null=True)),
                ('diary', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='diary.diary')),
            ],
        ),
        migrations.CreateModel(
            name='DiaryRemove',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path', models.CharField(max_length=100, null=True)),
                ('width', models.FloatField(null=True)),
                ('height', models.FloatField(null=True)),
                ('imageX', models.FloatField(null=True)),
                ('imageY', models.FloatField(null=True)),
                ('degree', models.FloatField(null=True)),
                ('diary', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='diary.diary')),
            ],
        ),
        migrations.CreateModel(
            name='DiaryImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('width', models.FloatField(null=True)),
                ('height', models.FloatField(null=True)),
                ('imageX', models.FloatField(null=True)),
                ('imageY', models.FloatField(null=True)),
                ('degree', models.FloatField(null=True)),
                ('diary', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='diary.diary')),
            ],
            options={
                'db_table': 'Diary_Image',
            },
        ),
        migrations.CreateModel(
            name='DiaryHashtag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hashtag', models.CharField(max_length=100, null=True)),
                ('diary', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='diary.diary')),
            ],
            options={
                'db_table': 'Diary_Hashtag',
            },
        ),
    ]
