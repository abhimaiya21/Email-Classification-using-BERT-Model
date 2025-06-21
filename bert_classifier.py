# 1. Imports
import pandas as pd
import numpy as np
import json
import tensorflow as tf
from transformers import BertTokenizer, TFBertForSequenceClassification
from sklearn.model_selection import train_test_split

# 2. Load and Preprocess Data
mock_emails_data = [
  {
    "id": "1",
    "sender": "notifications@github.com",
    "subject": "[Project] New pull request #123: Feature implementation",
    "body": "A new pull request has been opened for review. The feature includes user authentication and dashboard improvements. Please review and provide feedback.",
    "category": "WORK"
  },
  {
    "id": "2",
    "sender": "spam@suspicious-site.com",
    "subject": "URGENT!!! Act Now - Limited Time Offer - Free Money!!!",
    "body": "Congratulations! You have won $1,000,000!!! Click here immediately to claim your prize. This offer expires in 24 hours. Act now before it's too late!",
    "category": "SPAM"
  },
  {
    "id": "3",
    "sender": "mom@gmail.com",
    "subject": "Family dinner this weekend",
    "body": "Hi honey, we're planning a family dinner this Saturday at 6 PM. Can you make it? Dad is making his famous lasagna. Let me know if you can come!",
    "category": "PERSONAL"
  },
  {
    "id": "4",
    "sender": "noreply@amazon.com",
    "subject": "Amazon Prime Day Sale - 50% off Electronics!",
    "body": "Don't miss our biggest sale of the year! Get up to 50% off on electronics, 30% off on home goods, and free shipping on all orders. Use coupon code PRIME50.",
    "category": "PROMOTIONS"
  },
  {
    "id": "5",
    "sender": "notifications@linkedin.com",
    "subject": "John Smith liked your post",
    "body": "John Smith and 5 others liked your recent post about \\"The Future of AI in Software Development\\". Your post is gaining traction!",
    "category": "SOCIAL"
  },
  {
    "id": "6",
    "sender": "sarah.johnson@company.com",
    "subject": "Weekly team meeting - Project status update",
    "body": "Hi team, our weekly meeting is scheduled for tomorrow at 10 AM. We'll discuss the current sprint progress, upcoming deadlines, and milestone reviews.",
    "category": "WORK"
  },
  {
    "id": "7",
    "sender": "newsletter@techcrunch.com",
    "subject": "TechCrunch Weekly Newsletter - Latest in Tech",
    "body": "This week in tech: New AI breakthroughs, startup funding rounds, and the latest in cryptocurrency. Plus exclusive interviews with top tech CEOs.",
    "category": "PROMOTIONS"
  },
  {
    "id": "8",
    "sender": "calendar-notification@google.com",
    "subject": "Reminder: Client meeting in 1 hour",
    "body": "This is a reminder that you have a client meeting scheduled in 1 hour. Location: Conference Room A. Meeting topic: Q4 Strategy Review.",
    "category": "WORK"
  },
  {
    "id": "9",
    "sender": "fake-bank@scammer.org",
    "subject": "URGENT: Verify your account now or it will be closed!",
    "body": "Your bank account has been flagged for suspicious activity. Click here immediately to verify your identity or your account will be permanently closed within 24 hours.",
    "category": "SPAM"
  },
  {
    "id": "10",
    "sender": "bestfriend@yahoo.com",
    "subject": "Birthday party invitation!",
    "body": "Hey! I'm throwing a birthday party next Saturday at my place. It starts at 7 PM. There will be food, drinks, and good music. Hope you can make it!",
    "category": "PERSONAL"
  }
]

df = pd.DataFrame(mock_emails_data)
df['text'] = df['subject'] + " " + df['body']
categories = df['category'].unique()
category_map = {category: i for i, category in enumerate(categories)}
df['label'] = df['category'].map(category_map)

# 3. Tokenization
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
X = df['text'].tolist()
y = df['label'].tolist()
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)
train_encodings = tokenizer(X_train, truncation=True, padding=True, max_length=128)
val_encodings = tokenizer(X_val, truncation=True, padding=True, max_length=128)

train_dataset = tf.data.Dataset.from_tensor_slices((dict(train_encodings), y_train))
val_dataset = tf.data.Dataset.from_tensor_slices((dict(val_encodings), y_val))

# 4. Build and Train the Model
num_labels = len(categories)
model = TFBertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=num_labels)

optimizer = tf.keras.optimizers.Adam(learning_rate=5e-5)
loss = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)
metric = tf.keras.metrics.SparseCategoricalAccuracy('accuracy')

model.compile(optimizer=optimizer, loss=loss, metrics=[metric])
history = model.fit(train_dataset.shuffle(100).batch(8), epochs=3, batch_size=8, validation_data=val_dataset.batch(8))

# 5. Evaluate
loss, accuracy = model.evaluate(val_dataset.batch(8))
print(f"Validation Loss: {loss}")
print(f"Validation Accuracy: {accuracy}")

# 6. Predict
new_email_text = "Hey, let's catch up tomorrow for lunch. How about that new cafe downtown?"
predict_input = tokenizer.encode(new_email_text, truncation=True, padding=True, return_tensors="tf")
output = model(predict_input)[0]
prediction_value = tf.argmax(output, axis=1).numpy()[0]
inv_category_map = {v: k for k, v in category_map.items()}
predicted_category = inv_category_map[prediction_value]

print(f"New Email Text: '{new_email_text}'")
print(f"Predicted Category: {predicted_category}") 