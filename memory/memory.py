import json
from datetime import datetime
from typing import Any, Dict, List

class ViolaSyncMemory:
    """Memory management system for ViolaSync app"""
    
    def __init__(self):
        self.cache = {}
        self.history = []
        self.settings = {}
    
    def store(self, key: str, value: Any) -> None:
        """Store data in memory"""
        self.cache[key] = {
            'value': value,
            'timestamp': datetime.now().isoformat()
        }
    
    def retrieve(self, key: str) -> Any:
        """Retrieve data from memory"""
        if key in self.cache:
            return self.cache[key]['value']
        return None
    
    def delete(self, key: str) -> bool:
        """Delete data from memory"""
        if key in self.cache:
            del self.cache[key]
            return True
        return False
    
    def add_to_history(self, action: str, data: Dict) -> None:
        """Add action to history"""
        self.history.append({
            'action': action,
            'data': data,
            'timestamp': datetime.now().isoformat()
        })
    
    def get_history(self, limit: int = 10) -> List[Dict]:
        """Get recent history"""
        return self.history[-limit:]
    
    def clear_memory(self) -> None:
        """Clear all memory"""
        self.cache.clear()
        self.history.clear()
    
    def export_memory(self) -> Dict:
        """Export memory as dictionary"""
        return {
            'cache': self.cache,
            'history': self.history,
            'settings': self.settings
        }
    
    def import_memory(self, data: Dict) -> None:
        """Import memory from dictionary"""
        self.cache = data.get('cache', {})
        self.history = data.get('history', [])
        self.settings = data.get('settings', {})

# Initialize memory instance
memory = ViolaSyncMemory()